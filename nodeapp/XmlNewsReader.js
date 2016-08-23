(function () {
"use strict";


const xpathStream = require('xpath-stream');
const http  = require("http");
const moment = require("moment");
const download_items = process.env.ITEMS;
const hostname = process.env.HOSTNAME;

//TODO: skip importing outdated items

const urls = [{
                url: `http://${hostname}:8036/Newsflash/service/news/Nachrichten/${download_items}`,
                category: 'news'
            },
            {
                url: `http://${hostname}:8036/Newsflash/service/news/Sport/${download_items}`,
                category: 'sport'
            }];

class XmlNewsReader {
    
    constructor (db){
        this.db = db;
        this.load();
    }
    

    //xml stream parser
    /**
     * @param {stream} stream from http get.
     * passes sendungen to addSendetermin
     */
    parseXmlStream(stream, category, done){

        let lastitem = false;
        
        // get Sendungen
        stream
            .pipe(xpathStream("/newscenter/newsflash",{
                id: "id/text()",
                _id: "id/text()",
                topic: "subType/text()",
                title: "title/text()",
                text: "text/text()",
                dateTime: "dateTime/text()",
                asset:{
                    type: "asset/type/text()",
                    reference  : "asset/reference/text()"
                }
            }))
            .on('data',(result)=>{

                log.info("xmlReader:", result.length,"items");
                log.info("category:", category);
                for(let item in result){
                    let newsitem = result[item];
                    
                    /**
                     * Add category and version to docs
                     */
                    newsitem.category = category;
                    newsitem.dateTime = moment(newsitem.dateTime).format();
                    newsitem.version = process.env.npm_package_config_version;
                    
                    /**
                     * Change ID because its used twice in Sport and Nachrichten
                     */
                    newsitem._id = newsitem.id = newsitem._id + "-" + category;

                    /* FIX add empty text if none*/
                    if (!newsitem.text) newsitem.text = "";

                    /**
                     * reorder assets
                     */
                    if (typeof newsitem.asset.type == "object"){
                        // array of image and/or video elementse: [ 'Image', 'VCMS', ... ]
                        // find right position in array
                        let tempasset = [];
                        let size = newsitem.asset.type.length;

                        for (let i=0;i<size;i++){
                            let asset = {};

                            if (newsitem.asset.type[i] == "Image"){
                                asset = {   "type": newsitem.asset.type[i],
                                            "reference": newsitem.asset.reference[i],
                                            "teaserImageRef": {
                                                "reference": newsitem.asset.reference[i],
                                                "title": "",
                                                "altText": "",
                                                "caption": "",
                                                "profile": "http://zdf.de/rels/image",
                                                "layouts": 
                                                    {
                                                    "388x218": `http://www.zdf.de/ZDF/zdfportal/cutout/${newsitem.asset.reference[i]}/61caa28e-e448-4723-96cd-f65b03dabeb4`
                                                    }
                                            }
                                        };
                                tempasset.push(asset);
                            } else if (newsitem.asset.type[i] == "VCMS"){
                                asset = {   "type": newsitem.asset.type[i],
                                            "reference": newsitem.asset.reference[i],
                                            "externalId": "",
                                            "id": ""
                                        };
                                tempasset.push(asset);
                            }                            
                        }
                        

                        //sort by ref because its necessary
                        tempasset = tempasset.sort( (a, b)=>{
                            if (a.reference > b.reference){
                                return 1;
                            }
                            if (a.reference < b.reference){
                                return -1;
                            }                            
                            return 0;
                        });

                        newsitem.asset = tempasset;
                    } else if (typeof newsitem.asset.type == "string"){
                        // only one item
                            if (newsitem.asset.type == "Image"){
                                newsitem.asset = [{  "type": newsitem.asset.type ,
                                                    "reference": newsitem.asset.reference,
                                                    "teaserImageRef": {
                                                        "reference": newsitem.asset.reference,
                                                        "title": "",
                                                        "altText": "",
                                                        "caption": "",
                                                        "profile": "http://zdf.de/rels/image",
                                                        "layouts": 
                                                            {
                                                            "388x218": `http://www.zdf.de/ZDF/zdfportal/cutout/${newsitem.asset.reference}/61caa28e-e448-4723-96cd-f65b03dabeb4`
                                                            }
                                                    }
                                                 }];
                            } else if (newsitem.asset.type == "VCMS"){
                                newsitem.asset = [{  "type": newsitem.asset.type,
                                                    "reference": newsitem.asset.reference,
                                                    "externalId": "",
                                                    "id": ""
                                                 }];
                            }                        
                        //newsitem.asset = [{ "type": newsitem.asset.type, "reference": newsitem.asset.reference }];
                    } else {
                        // no asset
                        newsitem.asset = [];
                    }



                    /**
                     * apply cutout on assest
                     * asset maybe a string or an array of strings
                     */

                    // newsitem.asset.map( (asset) =>{
                    //     if ( asset.type.toLowerCase() === "image"){
                    //         asset.cutout = [];
                    //         asset.cutout.push({"388x218": `http://www.zdf.de/ZDF/zdfportal/cutout/${asset.reference}/61caa28e-e448-4723-96cd-f65b03dabeb4`});
                    //     }
                    // });



                    this.db.addItem(newsitem);               
                }
                if (lastitem){
                    done(category);                    
                } else {
                    lastitem = true;
                }
            })
            .on("end",()=>{
                if (lastitem){
                    done(category);                    
                } else {
                    lastitem = true;    
                }
                
            });
    }
    
    
    _downloadURL(url, done){

        var get_options = require('url').parse(url.url);
        get_options.headers = {
                'User-Agent': process.env.npm_package_config_useragent,
                'Cache-Control': 'no-cache'
            };

        http.get(get_options, (responeStream) => {

            if (responeStream.statusCode != 200){
                log.error(`getXmlStream: Got invalid statusCode`);
                return;
            } else {
                
                if (responeStream.headers['content-length'] == 0){
                    log.error(`getXmlStream: Got emtpy response`);
                    return;
                }
                //send to xml stream reader                   
                this.parseXmlStream(responeStream, url.category, done);
            }
        }).on('error', (e) => {
            log.error(`Error in response: from ${url.url}`);
        });          
    }
    
    /**
     * Load Data from XML Endpoint
     */
    load() {
        
        // count open requests
        let open = 0;
       
        
        urls.forEach( url => {
            open += 1;
            log.debug("Download:", url);
            
            this._downloadURL(url, (category) => {
                
                // call after category finished downloading
                log.info(`done ${category}`);
                open -= 1;
                if (open === 0){
                    // trigger removal of outdated docs
                    this.db.markOutdated();                   
                }                
            });
                
        });
      
    }
    
}





module.exports = XmlNewsReader;
}());