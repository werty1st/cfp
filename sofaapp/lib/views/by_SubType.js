


exports.by_SubType = {
    map: function(doc) {
        emit([doc.subType, doc.dateTime], doc);       
    }
};


