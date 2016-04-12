(function () {
"use strict";


var xpathStream = require('xpath-stream');
var http  = require("http");

var url = 'http://cm2-prod-program01.dbc.zdf.de:8036/Newsflash/service/news/Nachrichten/';


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
    parseXmlStream(stream){

        // get Sendungen
        stream
            .pipe(xpathStream("/newscenter/newsflash",{
                externalId: "id/text()",
                _id: "id/text()",
                subType: "subType/text()",
                title: "title/text()",
                text: "text/text()",
                dateTime: "dateTime/text()"
            }))
            .on('data',(result)=>{

                log.debug("xmlReader:", result.length,"items");
                for(let item in result){
                    let newsitem = result[item];
                    this.db.addItem(newsitem);               
                }           
            });
    }
    
    /**
     * Load Data from XML Endpoint
     */
    load(){
        log.info("Download:",url);

        var get_options = require('url').parse(url);
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
                this.parseXmlStream(responeStream);
            }
        }).on('error', (e) => {
            log.error(`Error in response: from ${url}`);
        });        
    }
    
}





module.exports = XmlNewsReader;
}());