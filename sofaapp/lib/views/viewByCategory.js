


module.exports.viewByCategory = {
    map: function(doc) {
        emit([doc.category, doc.dateTime], doc);       
    }
};

module.exports.viewByTopic = {
    map: function(doc) {
        emit([doc.topic, doc.dateTime], doc);       
    }
};

// module.exports.viewByCategoryTopic = {
//     map: function(doc) {
//         emit([doc.category, doc.topic, doc.dateTime], doc);       
//     }
// };


module.exports.viewBySportTopic = {
    map: function(doc) {
        if (doc.category == "sport")
            emit([doc.topic, doc.dateTime], doc);       
    }
};


module.exports.viewByNewsTopic = {
    map: function(doc) {
        if (doc.category == "news")
            emit([doc.topic, doc.dateTime], doc);       
    }
};


