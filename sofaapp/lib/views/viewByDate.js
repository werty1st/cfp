module.exports.viewByDate = {
    map: function(doc) {
        emit(doc.dateTime, doc);       
    }
};
