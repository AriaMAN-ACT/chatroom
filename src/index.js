const socketIo = require('socket.io');
const express = require('express');

const namespaces = require('./utils/namespaces');
const socketEvents = require('./models/SocketEvents');

const app = express();

app.use(express.static('public'));

const server = app.listen(3000);

const io = socketIo(server);

namespaces.forEach(namespace => {
    io.of(namespace.endpoint).on(socketEvents.connection, socket => {
        socket.emit(socketEvents.nsLoadRooms, namespace.rooms);
        socket.on(socketEvents.joinRoom, data => {
            socket.join(data.room);
            io.of(data.namespace).in(data.room).clients((error, clients) => {
                io.of(data.namespace).in(data.room).emit(socketEvents.showMembers, clients);
            });
        });
        socket.on(socketEvents.clientMsg, message => {
            const room = Object.keys(socket.rooms)[1];
            io.of(namespace.endpoint).to(room).emit(socketEvents.serverMsg, {
                message,
                time: Date.now(),
                username: 'Aria',
                avatar: 'http://via.placeholder.com/30'
            });
        });
    });
});

io.on(socketEvents.connection, (socket, req) => {
    const nsData = namespaces.map(namespace => {
        return {
            image: namespace.img,
            endpoint: namespace.endpoint
        };
    });

    socket.emit(socketEvents.nsList, nsData);
});