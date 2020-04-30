const messaging = (nsSocket) => {
    document.querySelector('.message-form').addEventListener('submit', event => {
        event.preventDefault();
        const message = document.getElementById('user-message').value;
        nsSocket.emit('clientMsg', message);
        document.getElementById('user-message').value = '';
    });
    nsSocket.on('serverMsg', msg => {
        const msgDate = new Date(msg.time);
        const msgTime = `${msgDate.toDateString()} ${msgDate.getHours()}:${msgDate.getMinutes()}`;
        document.getElementById('messages').innerHTML += `
                <li>
                    <div class="user-image">
                        <img src=${msg.avatar} />
                    </div>
                    <div class="user-message">
                        <div class="user-name-time">${msg.username} <span>${msgTime}</span></div>
                        <div class="message-text">${msg.message}</div>
                    </div>
                </li>`;
    });
};