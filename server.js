var express = require('express');
var app = express();
var port = 7029
var appName = "zdChat";


app.set('views', __dirname + '/templates');
app.set('view engine', 'jade');
app.engine('jade', require('jade').__express);
app.get('/', function(req,res) {
    res.render('page');
});


app.use(express.static(__dirname + '/public'));
var io = require('socket.io').listen(app.listen(port));
io.set('transports', ['xhr-polling']);
console.log('Listening on port ' + port);

io.sockets.on('connection', function(socket) {
    socket.emit('message', { message: { content: 'Welcome to ' + appName, user: appName }});
    io.sockets.emit('join', {client: socket.id});
    socket.on('send', function(data) {
        io.sockets.emit('message', data);
    });
});

var usernames = [];
io.sockets.on('add', function(data) {
    usernames.push(data.username);
    io.sockets.emit('change', { users: usernames });
});
