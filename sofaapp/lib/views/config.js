
// showFn+doc
// _show/lastModified/lastmodified', query: { accept: 'json'} },     

// listFn+viewFn
// http://localhost:5984/ecms/_design/olympia/_view/view_getAllbyDate?startkey="2016-03-15"&endkey="2016-03-16"
// _list/getToday_list/getAllWithTimeStamp', query: { accept: 'json', version: '2' }},
module.exports.config = {
    map: function(doc) {
        if (doc.type === "config")
            emit(doc, null);
    }
};