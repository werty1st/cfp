


module.exports.subType = {
    map: function(doc) {
        emit([doc.subType, doc.dateTime], doc);       
    }
};


