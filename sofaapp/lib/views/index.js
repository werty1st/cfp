
module.exports.viewByCategory 	    = require('./viewByCategory').viewByCategory;
module.exports.viewByTopic 	        = require('./viewByCategory').viewByTopic;
module.exports.viewTopics 	        = require('./viewByCategory').viewTopics;
module.exports.viewCategories       = require('./viewByCategory').viewCategories;
module.exports.viewCatTopics 	    = require('./viewByCategory').viewCatTopics;
//module.exports.viewByCategoryTopic 	= require('./viewByCategory').viewByCategoryTopic;

module.exports.viewBySportTopic 	= require('./viewByCategory').viewBySportTopic;
module.exports.viewByNewsTopic   	= require('./viewByCategory').viewByNewsTopic;

// remove old versions
module.exports.viewByVersion 	= require('./viewByVersion').viewByVersion;

// remove outdated
module.exports.viewByDate 	      = require('./viewByDate').viewByDate;
module.exports.viewByDateCatTopic = require('./viewByDateCatTopic');
//module.exports.viewByDate_News 	= require('./viewByDate').viewByDate_News;
//module.exports.viewByDate_Sport = require('./viewByDate').viewByDate_Sport;

/*module.exports.view_getAllByStationDate 	= require('./view_getAllByStationDate').view_getAllByStationDate;*/
