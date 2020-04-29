const socketIo = require('socket.io');
const express = require('express');

const socketEvents = require('./model/SocketEvents');

const app = express();

app.use(express.static('public'));

const server = app.listen(3000);

const io = socketIo(server);

io.on('connection', (socket, req) => {
    socket.emit(socketEvents.successfulConnection, 'server connected');

    socket.on(socketEvents.clientMsg, msg => {
        io.emit(socketEvents.serverMsg, {msg, id: socket.id});
    });
});