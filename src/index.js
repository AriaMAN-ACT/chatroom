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
            const rooms = Object.keys(socket.rooms);
            for (let i = 1; i < rooms.length; i++) {
                socket.leave(rooms[i]);
                io.of(data.namespace).in(rooms[i]).clients((error, clients) => {
                    io.of(data.namespace).in(rooms[i]).emit(socketEvents.showMembers, {
                        members: clients,
                        room: rooms[i]
                    });
                });
            }
            socket.join(data.room);
            io.of(data.namespace).in(data.room).clients((error, clients) => {
                io.of(data.namespace).in(data.room).emit(socketEvents.showMembers, {
                    members: clients,
                    room: data.room
                });
            });
            const nsRoom = namespace.rooms.find(nsRoom => nsRoom.roomTitle === data.room);
            socket.emit(socketEvents.getHistory, nsRoom.history);
        });
        socket.on(socketEvents.clientMsg, message => {
            const room = Object.keys(socket.rooms)[1];
            const msgObj = {
                message,
                time: Date.now(),
                username: 'Aria',
                avatar: 'http://via.placeholder.com/30'
            };
            const nsRoom = namespace.rooms.find(nsRoom => nsRoom.roomTitle === room);
            nsRoom.addMessage(msgObj);
            io.of(namespace.endpoint).to(room).emit(socketEvents.serverMsg, msgObj);
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