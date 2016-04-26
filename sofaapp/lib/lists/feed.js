module.exports.feed = function (head, req) {

	var doc = { 
		profile: "http://zdf.de/rels/content-feed",
		self: "/newsflash/feed/current",   
		completeFeed: true,
		invalidDowntime: "PT30M",
		description: "Die letzten 20 News",
		"http://zdf.de/rels/feed-items" : []
	};     

	var counter = {};

	var header = {};
	header['Content-Type'] = 'application/json; charset=utf-8';
	start({code: 200, headers: header});
     

	while( (row = getRow()) ){
		var item = row.value;
		
		/*
		removed, limit result by removing outdated items
		
		if (item.category == "sport") {
			if ( counter.sport ){
				counter.sport += 1;
				// max 20
				if (counter.sport > max_sport) continue;
			} else {
				counter.sport = 1;
			}			
		} else if ( item.category == "news" ) {
			if (counter[item.topic]){
				counter[item.topic] += 1;
				// max 20 per topic if news
				if (counter[item.topic] > max_news) continue;
			} else {
				counter[item.topic] = 1;
			}	
		}
		*/
		
		
		item.url = "newsflash/" + item._id;
		item.timestamp = item.dateTime;
		
		delete item._id;
		delete item._rev;
		delete item.version;
		delete item.topic;
		delete item.title;
		delete item.text;
		delete item.asset;
		delete item.category;
		delete item.dateTime;
				 
		doc["http://zdf.de/rels/feed-items"].push(item);
	}
	

	send( JSON.stringify(doc) );	

};	


