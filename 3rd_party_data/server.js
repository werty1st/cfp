var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

const PORT = process.env.PORTC;

app.use(express.static(__dirname + '/html'));

io.on('connection', function(socket){
  console.log('a user has connected');
});

http.listen(PORT, function(){
    console.log(`client is listening on *:${PORT}`);
});    




