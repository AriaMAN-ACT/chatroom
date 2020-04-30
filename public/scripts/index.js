const socket = io('http://localhost:3000');

socket.on('serverMsg', res => {
    document.getElementById('chat').innerHTML += `<div class="item">${res.id}: ${res.msg}</div>`;
});

document.getElementById('form').addEventListener('submit', event => {
    event.preventDefault();
    const input = document.getElementById('input');
    socket.emit('clientMsg', input.value);
    input.value = '';
});