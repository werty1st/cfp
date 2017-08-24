(function () {
"use strict";  


var XmlNewsReader = require('./XmlNewsReader');
var DbWorker      = require('./DbWorker');

var winston = require('winston');
              require('winston-mail').Mail;



var transports = [
    new (winston.transports.Console)({
    colorize: true,
    level: process.env.logLevel,
    handleExceptions: true,
    humanReadableUnhandledException: false
    })
];

if (process.env.mailserver){
    let subject = " -INT- ";
    if (process.env.NODE_ENV = 'production'){
        subject = "";
    }
    transports.push( new (winston.transports.Mail)({
        handleExceptions: true,
        humanReadableUnhandledException: false,
        to: process.env.receiver,
        from: "Newsflash"+subject+"App",
        host: process.env.mailserver,
        port: process.env.mailport,
        level: "error",
        subject: "Newsflash App Error Report"
    }));
}


    

global.log = new (winston.Logger)({
    exitOnError: true,
    transports: transports
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
