module.exports = function(doc, req) {
  
    var hostname = req.headers.Host;

    doc.profile = "http://zdf.de/rels/newsflash";
    doc.self = "/newsflash/" + doc._id;
    
    delete doc._id;
    delete doc._rev;
    delete doc._revisions;
    delete doc.version;

    /* FIX add empty text if none*/
    if (!doc.text) doc.text = "";

    provides('json', function(){
        return {"code": 200, "body": toJSON(doc), "headers" : { "Content-Type": "application/json; charset=utf-8"} };
    });    

    provides('html', function(){
        return {"code": 200, "body": '<pre>' + toJSON(doc) + '</pre>', "headers" : { "Content-Type": "application/json; charset=utf-8"} };
    });
       
};


