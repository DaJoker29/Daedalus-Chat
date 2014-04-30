$(document).ready(function () {
    var messages = [];
    var socket = io.connect('http://chat.zerodaedalus.com');
    var field = $('#field');
    var send = $('#send');
    var content = $('#content');
    var current = $('#current');
    var warning = $('#browserWarning');
    var user = getUser();
    var username = $('#username');
    var update = $('#update');
    

    //set username and display it on screen
    username.val(user);
    currentUser();

    //event handlers
    send.click(submit);
    update.click(setUser);
    field.keyup(function (e) {
        if(e.which === 13) {
            submit();
        } 
    });
    username.keyup(function (e) {
        if(e.which === 13) {
            setUser();
        } 
    });
    

    socket.on('message', function(data) {
        if(data.message.content) {
            $.each(data, function() {
                if(data.message.user === 'zdChat')
                    classes = 'message text-muted ';
                else
                    classes = 'message ';
                content
                    .append('<p></p>')
                    .find('p:last-child')
                    .addClass(classes + data.message.user)
                    .append('<span></span>')
                    .find('span:last-child')
                    .addClass('user')
                    .text(data.message.user + ': ')
                    .closest('.message')
                    .append('<span></span>')
                    .find('span:last-child')
                    .addClass('content')
                    .text(data.message.content)
            });
        }
        else {
            console.log('There is a problem:', data);
        }
    });

    function getUser() {
        if(typeof(Storage) !== "undefined") {
            warning.hide();
            if(localStorage.getItem('username'))
                name = localStorage.getItem('username');
            else
                name = generateUser();
        }
        else {
            warning.show();
        }
        return name;
    }

    function generateUser() {
        name = 'zd-' + Math.floor((Math.random() * 729) + 1);
        return name;
    }

    function setUser() {
        localStorage.setItem('username', username.val() );
        if(username.val() === '')
            user = generateUser();
        else
            user = username.val();
        currentUser();
    }

    function currentUser() {
        current.html('&nbsp;(Currently: ' + user + ')');
    }

    function submit() {
        var text = $('#field').val();
        socket.emit('send', { message: { content: text, user: user } });
        field.val('');
        content.animate({scrollTop: content.prop('scrollHeight')});
    }
});
