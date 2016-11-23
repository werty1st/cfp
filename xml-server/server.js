var express = require('express');
var app = express();
var http = require('http').Server(app);
//var io = require('socket.io')(http);

const PORT = 4000;

//app.use(express.static(__dirname));

app.use(function(req, res){
  res.sendfile(__dirname + '/nachrichten.xml');
});
// io.on('connection', function(socket){
//   console.log('a user has connected');
// });

http.listen(PORT, function(){
    console.log(`client is listening on *:${PORT}`);
});    
