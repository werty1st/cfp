(function () {
"use strict";


var xpathStream = require('xpath-stream');
var http  = require("http");

var urls = [{
                url: 'http://cm2-prod-program01.dbc.zdf.de:8036/Newsflash/service/news/Nachrichten/10',
                category: 'news'
            },
            {
                url: 'http://cm2-prod-program01.dbc.zdf.de:8036/Newsflash/service/news/Sport/10',
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
    parseXmlStream(stream, category){

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
                    newsitem.category = category;
                    this.db.addItem(newsitem);               
                }
                this.db.markOutdated();           
            });
    }
    
    
    _downloadURL(url){

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
                this.parseXmlStream(responeStream, url.category);
            }
        }).on('error', (e) => {
            log.error(`Error in response: from ${url.url}`);
        });          
    }
    
    /**
     * Load Data from XML Endpoint
     */
    load() {
        
        urls.forEach( url => {
            log.debug("Download:", url);
            this._downloadURL(url);    
        });
       
      
    }
    
}





module.exports = XmlNewsReader;
}());