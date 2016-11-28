


module.exports.viewByCategory = {
    map: function(doc) {
        emit([doc.category, doc.modificationTime || doc.timestamp || doc.dateTime], doc);       
    }
};

module.exports.viewByTopic = {
    map: function(doc) {
        emit([doc.topic, doc.modificationTime || doc.timestamp || doc.dateTime], doc);       
    }
    
};

module.exports.viewTopics = {
    map: function(doc) {
        emit( doc.topic,1);
    },
    reduce: function(keys, values, rereduce) {
        return sum(values);
    }
};

module.exports.viewCategories = {
    map: function(doc) {
        emit( doc.category,1);
    },
    reduce: function(keys, values, rereduce) {
        return sum(values);
    }
};

module.exports.viewCatTopics = {
    map: function(doc) {
        emit( [doc.category,doc.topic],1);
    },
    reduce: function(keys, values, rereduce) {
        return sum(values);
    }
};


// module.exports.viewByCategoryTopic = {
//     map: function(doc) {
//         emit([doc.category, doc.topic, doc.modificationTime || doc.timestamp || doc.dateTime], doc);       
//     }
// };


module.exports.viewBySportTopic = {
    map: function(doc) {
        if (doc.category == "sport")
            emit([doc.topic, doc.modificationTime || doc.timestamp || doc.dateTime], doc);       
    }
};


module.exports.viewByNewsTopic = {
    map: function(doc) {
        if (doc.category == "news")
            emit([doc.topic, doc.modificationTime || doc.timestamp || doc.dateTime], doc);       
    }
};


