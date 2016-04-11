var XmlNewsReader = require('./XmlNewsReader');

var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var PouchDB = require('pouchdb');
var winston = require('winston');

global.log = new (winston.Logger)({
    exitOnError: false,
    transports: [
      new (require('winston-daily-rotate-file'))({ name:"errorlog", level: "error", dirname: "logs", filename: "error.log"  }),
      new (require('winston-daily-rotate-file'))({ name:"infolog",  level: "info", dirname: "logs", filename: "info.log"  }),
      new (winston.transports.Console)({colorize: true, level: process.env.npm_package_config_logLevel })
    ]
  });

log.info("Start");

const db = new PouchDB(process.env.npm_package_config_database);
const PORT = process.env.PORTS;

app.use(express.static(__dirname + '/html'));

io.on('connection', function(socket){
  log.info('client is talking to me');
});

http.listen(PORT, function(){
  log.debug(`server is listening on *:${PORT}`);
});


db.info().then(function (info) {
  log.debug("db:", info);
});

// syncCouchdb
//todo

// getXMLData
const xmlReader = new XmlNewsReader(db);
log.debug("xmlReader loaded");




