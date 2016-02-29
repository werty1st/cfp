var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

const PORT = process.env.PORTS;

app.use(express.static(__dirname + '/html'));

io.on('connection', function(socket){
  console.log('Picker Host is talking to me');
});

http.listen(PORT, function(){
  console.log(`server is listening on *:${PORT}`);
});