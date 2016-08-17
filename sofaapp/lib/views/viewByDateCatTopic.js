module.exports = {
    map: function(doc) {
        // http://localhost:5984/newsflash/_design/app/_list/feed/viewByDate?descending=true 
        // http://localhost:5984/newsflash/_design/app/_view/viewByDate?descending=false 
        emit( [doc.category, doc.topic, doc.dateTime], doc );
    }
};
