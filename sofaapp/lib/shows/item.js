//http://localhost:5984/newsflash_int/_design/app/_show/item/9102635-news

module.exports = function(doc, req) {
  
    var hostname = req.headers.Host;
    var path = req.info.db_name;
    if (path.indexOf("_") > 0){
        path = path.replace("_", "-");
    }

    doc.profile = "http://zdf.de/rels/newsflash";
    doc.self = "/" + path + "/" + doc._id;
    
    delete doc._id;
    delete doc._rev;
    delete doc._revisions;
    delete doc.version;
    //delete doc.timestamp;
    doc.timestamp = doc.modificationTime;

    /* FIX add empty text if none*/
    if (!doc.text) doc.text = "";

    return {"code": 200, "body": toJSON(doc), "headers" : { "Content-Type": "application/json; charset=utf-8"} };
    
       
};
