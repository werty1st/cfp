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
            }).then(()=>{
                //return this.db.allDocs( {include_docs: false} );
            }).then((result) => {
                //create view to filter old values
                //this.allDocs = result.rows;                
            }).catch( (err) =>{
                log.error(err);
                throw new Error (err);
            });

    }
    
    /**
     * diff Function to compare doc from XML with doc from DB if it exists
     */
    _diffDocs( newdoc ) {
        
        return function ( olddoc ){
            // diff doc                
            let diffResult = diff(newdoc, olddoc); 

            if ( (diffResult.length == 1) &&
                    (diffResult[0].path[0] === "_rev")) {
                // only diff is _rev property
                return false;
            } else {
                // something changed, return new item
                
                // set current document version without trigger update
                newdoc.version = process.env.npm_package_config_version_items;
                
                return newdoc;
            }        
        };
    }


    /**
     * find and remove outdated items
     */
    markOutdated() {
    
        let oldcount=0;
        
        this.db.query('app/viewByVersion',{
                endkey: process.env.npm_package_config_version_items,
                inclusive_end: false
            }).then( (res) => {
                
                oldcount = res.rows.length;

                //build array of docs to delete
                return res.rows.map((x)=>{                                        
                    return {
                        _id: x.id,
                        _rev: x.value,
                        _deleted: true
                    };
                });
        })
        .then( (docs2delete) => {
            
            // remove old versions elements
            this.db.bulkDocs(docs2delete)
            .then((result)=>{
                log.info(`Deleted ${oldcount} old versions.`);
            })
            .catch((err)=>{
                log.error("Error removing docs with old version.");
                throw new Error(err);    
            });
        })
        .catch( (err) => {
            console.log(err);
            // some error
        });         
        

        
        // remove items with lower version number
/*        this.db.allDocs( {include_docs: true} )
            .then((result)=>{
                
            })
            .catch((err)=>{
               log.error(err);
               throw new Error(err); 
            });*/
        
    }





    /**
     * add XML News Item to DB
     */
    addItem(item){
        //send to db
        log.debug("upsert item",item._id);
                
        this.db.upsert(
            item._id,
            this._diffDocs(item) //compare old and new doc, returns false or new doc
        ).then( (response) => {
            log.debug("success", item._id, response); 
        }).catch((err) => {
            log.error("error", err);
            throw new Error (err);            
        });
        
}

}

module.exports = new DbWorker();

}());