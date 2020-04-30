const socketIo = require('socket.io');
const express = require('express');

const namespaces = require('./utils/namespaces');
const socketEvents = require('./models/SocketEvents');

const app = express();

app.use(express.static('public'));

const server = app.listen(3000);

const io = socketIo(server);

namespaces.forEach(namespace => {
    io.of(namespace.endpoint).on(socketEvents.connection, socket => {})
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