module.exports = function(doc, req) {
  
    var hostname = req.headers.Host;

    if (doc === null){

        doc = { 
            self: "/newsflash/feed",   
            profile: "http://zdf.de/rels/feed-provider",
            description: "Der newsflash Service Feed",
            current: "https://" + hostname+ "/newsflash/feed/current"
        };        
    } else {
        doc.current = "https://" + hostname+ "/current";
        delete doc._id;
        delete doc._rev;
    }

    provides('json', function(){
        return {"code": 200, "body": toJSON(doc), "headers" : { "Content-Type": "application/json; charset=utf-8"} };
    });    

    provides('html', function(){
        return {"code": 200, "body": '<pre>' + toJSON(doc) + '</pre>', "headers" : { "Content-Type": "application/json; charset=utf-8"} };
    });
       
};


