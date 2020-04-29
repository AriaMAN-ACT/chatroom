const http = require('http');
const socketIo = require('socket.io');

const server = http.createServer((req, res) => {
    console.log('server started');
});

const socket = socketIo(server);

socket.on('connection', (socket, req) => {
    socket.emit('successfulConnection', 'server connected');

    socket.on('message', msg => {
        console.log(msg);
    });
});

server.listen(3000);