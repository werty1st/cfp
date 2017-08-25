//http://localhost:5984/newsflash_int/_design/app/_show/current

module.exports = function(doc, req) {
  
    var hostname = req.headers.Host;

    var path = req.info.db_name;
    if (path.indexOf("_") > 0){
        path = path.replace("_", "-");
    }

    //there should not be a settings doc, otherwise ignore it
    doc = { 
        self: "/" + path + "/feed",   
        profile: "http://zdf.de/rels/feed-provider",
        description: "Der newsflash Service Feed",
        current: "https://" + hostname+ "/" + path + "/feed/current"
    };        
 

    return {"code": 200, "body": toJSON(doc), "headers" : { "Content-Type": "application/json; charset=utf-8"} };
       
};


