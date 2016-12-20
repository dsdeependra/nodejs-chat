var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message',msg);
  });

  socket.on('private message', function (from, msg) {
    io.emit('joinuser',from);
    io.emit('private message',msg);
    console.log('I received a private message by ', from, ' saying ', msg);
  });

  socket.on('typing',function(username){
      io.emit('typing',username);
      console.log(username,'is typing');
  })
  
});

