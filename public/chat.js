$(document).ready(function () {
    var ENTER = 13;
    var messages = [];
    var socket = io.connect('http://chat.zerodaedalus.com');
    var field = $('#field');
    var send = $('#send');
    var content = $('#content');
    var current = $('#current');
    var warning = $('#browserWarning');
    var error = $('#errorWarning');
    var user = getUser();
    var username = $('#username');
    var update = $('#update');
    var id;

    function User() {
        
    }
    
    //Hide warning
    warning.hide();
    error.hide();

    //set username and display it on screen
    username.val(user);
    currentUser();

    //event handlers
    send.click(submit);
    update.click(setUser);
    field.keyup(function (e) {
        if(e.which === ENTER) {
            submit();
        } 
    });
    username.keyup(function (e) {
        if(e.which === ENTER) {
            setUser();
        } 
    });
    
    socket.on('message', function(data) {
        if(data.content) {
            if(data.user === 'Hermes')
                classes = 'message text-muted ';
            else
                classes = 'message ';
            content
                .append('<p></p>')
                .find('p:last-child')
                .addClass(classes + id)
                .append('<span></span>')
                .find('span:last-child')
                .addClass('user')
                .text(data.user + ': ')
                .closest('.message')
                .append('<span></span>')
                .find('span:last-child')
                .addClass('content')
                .text(data.content)
        }
        else {
            console.log('There is a problem:', data);
            error.show();
        }
    });

    function getUser() {
        if(typeof(Storage) !== "undefined") {
            if(localStorage.getItem('username'))
                name = localStorage.getItem('username');
            else
                name = generateUsername();
        }
        else {
            warning.show();
        }
        return name;
    }

    function setUser() {
        localStorage.setItem('username', username.val() );
        if(username.val() === '')
            user = generateUsername();
        else
            user = username.val();
        currentUser();
    }

    function generateUsername() {
        return 'zd-' + Math.floor((Math.random() * 729) + 1);
    }

    function currentUser() {
        current.html('&nbsp;(Currently: ' + user + ')');
        socket.emit('join', user);
        console.log(user);
    }

    function submit() {
        var text = $('#field').val();
        socket.emit('send', { content: text, user: user });
        field.val('');
        content.animate({scrollTop: content.prop('scrollHeight')});
    }
});
