var express = require('express');
var app = express();
var PORT = 7029;
var APPNAME = "Hermes";

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

//Event Handlers
io.sockets.on('connection', function(socket) {
    welcome = new Message("Welcome to the ZeroDae chat service.", APPNAME);
    socket.emit('message', welcome );
    io.sockets.emit('join', {client: socket.id});
    socket.on('send', function(data) {
        message = new Message(data.content, data.user);
        io.sockets.emit('message', message);
    });
});


function Message(content, user) {
    this.content = content;
    this.user = user;
}
