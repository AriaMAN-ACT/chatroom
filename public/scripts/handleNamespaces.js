const handleNameSpaces = socket => {
    socket.on('nsList', nsData => {
        const namespacesDiv = document.getElementById('namespaces');
        namespacesDiv.innerHTML = '';
        nsData.forEach(ns => {
            namespacesDiv.innerHTML += `<div class="namespace"><img src="${ns.image}"</div>`;
        });

        Array.from(document.getElementsByClassName('namespace')).forEach((element, index) => {
            element.addEventListener('click', event => {
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
                    const roomsElements = Array.from(document.getElementsByClassName('room'));
                    roomsElements.forEach((roomElement, index) => {
                        roomElement.addEventListener('click', event => {
                        });
                    })
                });
            });
        });
    });
};