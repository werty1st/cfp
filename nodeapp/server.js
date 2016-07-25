(function () {
"use strict";  


var XmlNewsReader = require('./XmlNewsReader');
var DbWorker      = require('./DbWorker');

var winston = require('winston');
global.log = new (winston.Logger)({
    exitOnError: false,
    transports: [
      new (winston.transports.Console)({colorize: true, level: process.env.npm_package_config_logLevel })
    ]
  });

log.info("Start");


// syncCouchdb
//todo

// getXMLData
const xmlReader = new XmlNewsReader(DbWorker);
log.info("xmlReader loaded");


}());
