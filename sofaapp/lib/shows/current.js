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
        return toJSON(doc);
    });    

    provides('html', function(){
        return '<pre>' + toJSON(doc) + '</pre>';
    });
       
};


