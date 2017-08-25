(function () {
"use strict";

const moment = require("moment");

const PouchDB = require('pouchdb');
    PouchDB.plugin(require('pouchdb-upsert'));
    //PouchDB.debug.enable('*');
    
const ja = require('json-assert');


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

            olddoc._rev = ja.optional;
            olddoc.timestamp = ja.optional;
            olddoc.modificationTime = ja.optional;

            let res = ja.isEqual( olddoc, newdoc, true /*silence*/ );

            // if (!res){
            //     console.log("compare result\nolddoc\n",olddoc,"\nnewdoc\n", newdoc);
            //     process.exit();
            // }


            if ( res ) {
                // no update needed
                return false;
            } else {
                // something changed, return new item
                //change timestamp
                newdoc.modificationTime = moment().format();          
                newdoc.timestamp        = moment().format();          
                return newdoc;
            }        
        };
    }


    /**
     * remove outdated and wrong version items
     */
    markOutdated() {
    
        // count deleted items
        let ver_count=0;
        let old_count=0;
        let outdated = process.env.KEEP;
                
        /**
         * find docs with lower version 
         */
        this.db.query('app/viewByVersion',{
                endkey: process.env.npm_package_config_version,
                inclusive_end: "false"
            }).then( (res) => {
                
                ver_count = res.rows.length;

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
                
                // console.log("version: docs2delete",docs2delete);
                // return;
                
                // remove old versions elements
                this.db.bulkDocs(docs2delete)
                    .then((result)=>{
                        log.info(`Deleted ${ver_count} old versions.`);
                    })
                    .catch((err)=>{
                        log.warn("Removing docs with old version failed.");
                    });
            })
            .catch( (err) => {
                log.warn("Collecting docs with older version failed",err);
                // some error
            });         


        
        /** 
         * remove outdated docs 
         * viewByDateCreated ignores modification date
         * */
        this.db.query('app/viewByDateCreated',{
                descending: true, //newest first
                startkey: moment().subtract(outdated, 'days')                
            }).then( (res) => {
                                
                old_count = res.rows.length;

                //build array of docs to delete
                return res.rows.map((x)=>{                                        
                    return {
                        _id: x.value._id,
                        _rev: x.value._rev,
                        _deleted: true
                    };
                });
            })
            .then( (docs2delete) => {
                
                // log.warn("outdated: docs2delete",docs2delete);
                // var mom1 = moment().subtract(outdated, 'days').format();
                // log.warn("startkey: moment().subtract(outdated, 'days') ", mom1);
                //return;
                            
                // remove outdated elements
                this.db.bulkDocs(docs2delete)
                    .then((result)=>{
                        log.info(`Deleted ${old_count} old items.`);
                    })
                    .catch((err)=>{
                        log.warn("Removing outdated docs failed.");    
                        //log.error(err);
                    });
            })
            .catch( (err) => {
                log.error("Collecting outdated docs failed",err);
                // some error
            });
    }





    /**
     * add XML News Item to DB
     */
    addItem(item){
        //send to db
        //log.debug("upsert item",item._id);

        /**
         * skip already outdated items (happens on int)
         */
        let outdated = process.env.npm_package_config_age_keep;
        let itemdate = moment(item.dateTime);
        let invalidbefore = moment().subtract(outdated, 'days');
        if( itemdate.isBefore(invalidbefore) ){
            log.info("Outdated skip",item._id);
            return;
        }

                
        this.db.upsert(
                item._id,
                this._diffDocs(item) //compare old and new doc, returns false or new doc
            ).then( (response) => {
                log.debug("success", item._id, response);
            }).catch((err) => {
                log.error("Updating or inserting Document failed.", err);
                throw new Error (err);
            });
        
}

}

module.exports = new DbWorker();

}());
