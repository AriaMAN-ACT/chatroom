const joinRoom = (socket, rooms, index, namespace) => {
    const roomName = rooms[index].roomTitle;
    socket.emit('joinRoom', {
        room: roomName,
        namespace
    });
};