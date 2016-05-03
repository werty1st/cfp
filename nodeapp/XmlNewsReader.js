(function () {
"use strict";


var xpathStream = require('xpath-stream');
var http  = require("http");

var download_items = process.env.ITEMS;

var urls = [{
                url: `http://cm2-prod-program01.dbc.zdf.de:8036/Newsflash/service/news/Nachrichten/${download_items}`,
                category: 'news'
            },
            {
                url: `http://cm2-prod-program01.dbc.zdf.de:8036/Newsflash/service/news/Sport/${download_items}`,
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
                externalId: "id/text()",
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
                    newsitem.version = process.env.npm_package_config_version_items;
                    
                    /**
                     * Change ID because its used twice in Sport and Nachrichten
                     */
                    newsitem._id = newsitem._id + "-" + category;
                    
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
                console.log(`done ${category}`);
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