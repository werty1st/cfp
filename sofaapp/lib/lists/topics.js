module.exports = function (head, req) {

    var path = req.info.db_name;
    if (path.indexOf("_") > 0){
        path = path.replace("_", "-");
    }

	var doc = { 
		profile: "http://zdf.de/rels/content-feed",
		self: "/" + path + "/feed/current",   
		completeFeed: true,
		invalidDowntime: "PT30M",
		description: "list available topics by category",
		"http://zdf.de/rels/feed-items" : []
	};     


	var counter = {};

	var header = {};
	header['Content-Type'] = 'application/json; charset=utf-8';
	start({code: 200, headers: header});
     

	while( (row = getRow()) ){
		var item = { "category" : row.key[0], "topic" : row.key[1], "count": row.value};
		
		item.url = "/" + path + "/feed/filter/" + row.key[0] + "/" + row.key[1];
		item.timestamp = new Date().toISOString();
		item.profile = "http://zdf.de/rels/content-feed-item";
						 
		doc["http://zdf.de/rels/feed-items"].push(item);
	}
	

	send( JSON.stringify(doc) );
	

	

};	


