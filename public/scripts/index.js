const socket = io('http://localhost:3000');


socket.on('serverMsg', res => {
    document.getElementById('chat').innerHTML += `<div class="item">${res.id}: ${res.msg}</div>`;
});

socket.on('nsList', nsData => {
    const namespacesDiv = document.getElementById('namespaces');
    nsData.forEach(ns => {
        namespacesDiv.innerHTML += `<div class="namespace"><img src="${ns.image}"</div>`;
    });

    Array.from(document.getElementsByClassName('namespace')).forEach((element, index) => {
        element.addEventListener('click', event => {
            const nsEndpoint = nsData[index].endpoint;
        });
    });
});

document.getElementById('form').addEventListener('submit', event => {
    event.preventDefault();
    const input = document.getElementById('input');
    socket.emit('clientMsg', input.value);
    input.value = '';
});