module.exports.feed = function (head, req) {

    var path = req.info.db_name;
    if (path.indexOf("_") > 0){
        path = path.replace("_", "-");
    }

	var doc = { 
		profile: "http://zdf.de/rels/content-feed",
		self: "/" + path + "/feed/current",   
		completeFeed: true,
		invalidDowntime: "PT30M",
		description: "News der letzten 60h",
		"http://zdf.de/rels/feed-items" : []
	};     


	if (req.query.listname){
		if (req.query.cat && req.query.topic){
			doc.description = req.query.listname + " " + req.query.cat + " and " + req.query.topic;
		} else if (req.query.cat && !req.query.topic){
			doc.description = req.query.listname + " " + req.query.cat;
		}
		
	}


	var header = {};
	header['Content-Type'] = 'application/json; charset=utf-8';
	start({code: 200, headers: header});
     

	while( (row = getRow()) ){
		var item = row.value;
		
		item.url = "/" + path + "/" + item._id;
		item.timestamp = item.modificationTime || item.timestamp || item.dateTime;
		item.profile = "http://zdf.de/rels/content-feed-item";
		
		delete item._id;
		delete item._rev;
		delete item.version;
		delete item.topic;
		delete item.title;
		delete item.text;
		delete item.asset;
		delete item.category;
		delete item.dateTime;
		delete item.modificationTime;
		delete item._deleted_conflicts;
				 
		doc["http://zdf.de/rels/feed-items"].push(item);
	}
	

	send( JSON.stringify(doc) );	

};	


