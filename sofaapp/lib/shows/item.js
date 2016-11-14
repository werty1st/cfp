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

    /* FIX add empty text if none*/
    if (!doc.text) doc.text = "";

    return {"code": 200, "body": toJSON(doc), "headers" : { "Content-Type": "application/json; charset=utf-8"} };
    
    // provides('json', function(){
    // });    

    // provides('html', function(){
    //     return {"code": 200, "body": '<pre>' + toJSON(doc) + '</pre>', "headers" : { "Content-Type": "application/json; charset=utf-8"} };
    // });
       
};


