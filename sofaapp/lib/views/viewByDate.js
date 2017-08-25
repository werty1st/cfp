module.exports.viewByDate = {
    map: function(doc) {
        // http://localhost:5984/newsflash/_design/app/_list/feed/viewByDate?descending=true 
        // http://localhost:5984/newsflash/_design/app/_view/viewByDate?descending=false 
        emit( doc.modificationTime || doc.dateTime, doc );       
    }
};

module.exports.viewByDateCreated = {
    map: function(doc) {
        // http://localhost:5984/newsflash/_design/app/_list/feed/viewByDate?descending=true 
        // http://localhost:5984/newsflash/_design/app/_view/viewByDate?descending=false 
        emit( doc.dateTime, doc );       
    }
};

/*
module.exports.viewByDate_News = {
    map: function(doc) {
        // http://localhost:5984/newsflash/_design/app/_list/feed/viewByDate?descending=true 
        // http://localhost:5984/newsflash/_design/app/_view/viewByDate?descending=false 
        if ( doc.category == "news" ) {
            emit(doc.dateTime, doc);
        }       
    }
};

module.exports.viewByDate_Sport = {
    map: function(doc) {
        // http://localhost:5984/newsflash/_design/app/_list/feed/viewByDate?descending=true 
        // http://localhost:5984/newsflash/_design/app/_view/viewByDate?descending=false 
        if ( doc.category == "sport" ) {
            emit(doc.dateTime, doc);
        }
    }
};
*/