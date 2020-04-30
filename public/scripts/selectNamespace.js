const selectNamespace = (nsData, index, socket) => {
    const nsEndpoint = nsData[index].endpoint;
    const nsSocket = io(`http://localhost:3000${nsEndpoint}`);
    nsSocket.on('nsLoadRooms', rooms => {
        const roomListElement = document.getElementById('room-list');
        roomListElement.innerHTML = '';
        rooms.forEach(room => {
            let glyph = 'globe';
            if (room.privateRoom) {
                glyph = 'lock';
            }
            roomListElement.innerHTML +=
                `<li class="room"><span class="glyphicon glyphicon-${glyph}"></span>${room.roomTitle}</li>`;
        });
        joinRoom(nsSocket, rooms, 0, nsEndpoint);
        const roomsElements = Array.from(document.getElementsByClassName('room'));
        roomsElements.forEach((roomElement, index) => {
            roomElement.addEventListener('click', event => {
                joinRoom(nsSocket, rooms, index, nsEndpoint);
            });
        })
    });
    nsSocket.on('showMembers', data => {
        showMembers(data);
    });
    messaging(nsSocket);
};