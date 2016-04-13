(function () {
"use strict";

var PouchDB = require('pouchdb');
    PouchDB.plugin(require('pouchdb-upsert'));
    //PouchDB.debug.enable('*');
    
var diff = require('deep-diff').diff;    


class DbWorker {
    
    constructor (){
        this.db = new PouchDB(process.env.DB, {auto_compaction: true});
        this.db.info().then(function (info) {
            //log.debug("db:", info);
        });

    }
    /**
     * diff Function to compare doc from XML with doc from DB if it exists
     */
    diffDocs( newdoc ) {
        
        return function ( olddoc ){
            // diff doc                
            let diffResult = diff(newdoc, olddoc);               

            if ( (diffResult.length == 1) &&
                    (diffResult[0].path[0] === "_rev")) {
                // only diff is _rev property
                return false;
            } else {
                // something changed, return new item
                return newdoc;
            }        
        };
    }

    /**
     * add XML News Item to DB
     */
    addItem(item){
        //send to db
        
        log.debug("upsert item",item._id);        
        this.db.upsert(
            item._id,
            this.diffDocs(item)
        ).then( (response) => {
            console.log("success", item._id, response); 
        }).catch((err) => {
            console.log("error", err); 
            
        });
        
}

}

module.exports = new DbWorker();
}());