var io = require('socket.io-client'),
    url = require('url');

var chatURL = url.format({
    'protocol': 'https:',
    'hostname': '',
    'port': 9000,
    'query': {
        username: '',
        password: ''
    }
});

var socket = io.connect(chatURL, {
    reconnect: true
});

socket.on('connect', function() {
    console.log('connected');
    socket.emit('rooms:get');
});

socket.on('disconnect', function() {
    console.log('disconnected');
});

socket.on('error', function(error) {
    console.log(error);
});

socket.on('room:messages:new', function(message) {
    console.log('New message: "' + message.text + '" by "' + message.owner + '" in room "' + message.room + '#')
});

socket.on('room:users:new', function(user) {
    console.log('Saw user "' + user.name + '" in room "' + user.room + '"');
});

socket.on('rooms:new', function(room) {
    socket.emit('room:join', room.id, function(room) {
        console.log('Joined room' + room.name);
        socket.emit('room:messages:new', {
            room: room.id,
            text: 'Hello all you beautiful people in "' + room.name + '"!'
        });
    });
});