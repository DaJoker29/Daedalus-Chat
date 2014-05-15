var express = require('express');
var app = express();
var PORT = 7029;
var APPNICK = "Hermes";

//Set Views
app.set('views', __dirname + '/templates');
app.set('view engine', 'jade');
app.engine('jade', require('jade').__express);
app.get('/', function(req,res) {
    res.render('page');
});

//Setup server
app.use(express.static(__dirname + '/public'));
var io = require('socket.io').listen(app.listen(PORT));
io.set('transports', ['xhr-polling']);
console.log('Listening on port ' + PORT);

//Event Callbacks

function onSend(data) {
    var message = new Message(data.content, data.user).send();
}

function onJoin(data) {
    var join = new Message(data + " has joined the chat.").send();
}

function onDisconnect() {
    var leaving = new Message("Someone has left.").send();
}

//Event Handlers
io.sockets.on('connection', function(socket) {
    var welcome = new Message("Welcome to the ZeroDae chat service.");
    socket.emit('message', welcome);
    socket.on('send', onSend);
    socket.on('join', onJoin);
    socket.on('disconnect', onDisconnect);
});

function Message(content, user) {
    this.content = content;
    this.user = user || APPNICK;
}

Message.prototype.send = function() {
    io.sockets.emit('message', this);
}
