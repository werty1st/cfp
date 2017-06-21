(function () {
"use strict";  


var XmlNewsReader = require('./XmlNewsReader');
var DbWorker      = require('./DbWorker');

var winston = require('winston');
              require('winston-mail').Mail;

global.log = new (winston.Logger)({
    exitOnError: true,
    transports: [
      new (winston.transports.Console)({
          colorize: true,
          level: process.env.logLevel,
          handleExceptions: true,
          humanReadableUnhandledException: false
      }),
      new (winston.transports.Mail)({
          handleExceptions: true,
          humanReadableUnhandledException: false,
          to: process.env.receiver,
          from: "Lotto Gen",
          host: process.env.mailserver,
          port: process.env.mailport,
          level: "error",
          subject: "Lotto Gen Error Report"
      })
    ]
  });

log.info("Start");


// syncCouchdb
//todo


//terminate on error
// process.on('unhandledRejection', error => {
//   // Will print "unhandledRejection err is not defined"
//   process.exit(1);
// });

// getXMLData
const xmlReader = new XmlNewsReader(DbWorker);
log.info("xmlReader loaded");


}());
