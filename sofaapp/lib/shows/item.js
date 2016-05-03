module.exports = function(doc, req) {
  
    var hostname = req.headers.Host;

    doc.profile = "http://zdf.de/rels/newsflash";
    doc.self = "/newsflash/" + doc._id;
    
    delete doc._id;
    delete doc._rev;
    delete doc._revisions;
    delete doc.version;


    provides('json', function(){
        return toJSON(doc);
    });    

    provides('html', function(){
        return '<pre>' + toJSON(doc) + '</pre>';
    });
       
};


