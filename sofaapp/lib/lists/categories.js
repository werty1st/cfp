module.exports = function (head, req) {

	var doc = { 
		profile: "http://zdf.de/rels/content-feed",
		self: "/newsflash/feed/current",   
		completeFeed: true,
		invalidDowntime: "PT30M",
		description: "list available categories",
		"http://zdf.de/rels/feed-items" : []
	};     


	var counter = {};

	var header = {};
	header['Content-Type'] = 'application/json; charset=utf-8';
	start({code: 200, headers: header});
     

	while( (row = getRow()) ){
		var item = { "category" : row.key, "count": row.value};
		
		item.url = "/newsflash/feed/filter/" + row.key;
		item.timestamp = new Date().toISOString();
		item.profile = "http://zdf.de/rels/content-feed-item";
						 
		doc["http://zdf.de/rels/feed-items"].push(item);
	}
	

	send( JSON.stringify(doc) );
	

	

};	


