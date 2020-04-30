const buildChatItem = msg => {
    const msgDate = new Date(msg.time);
    const msgTime = `${msgDate.toDateString()} ${msgDate.getHours()}:${msgDate.getMinutes()}`;
    return `
                <li>
                    <div class="user-image">
                        <img src=${msg.avatar} />
                    </div>
                    <div class="user-message">
                        <div class="user-name-time">${msg.username} <span>${msgTime}</span></div>
                        <div class="message-text">${msg.message}</div>
                    </div>
                </li>`;
};

const goToBottom = () => {
    const messagesElement = document.getElementById('messages');
    messagesElement.scrollTo(0, messagesElement.scrollHeight);
};

const messaging = (nsSocket) => {
    document.querySelector('.message-form').addEventListener('submit', event => {
        event.preventDefault();
        const message = document.getElementById('user-message').value;
        nsSocket.emit('clientMsg', message);
        document.getElementById('user-message').value = '';
    });
    nsSocket.on('serverMsg', msg => {
        document.getElementById('messages').innerHTML += buildChatItem(msg);
    });
    nsSocket.on('getHistory', history => {
        document.getElementById('messages').innerHTML = '';
        history.forEach(msg => {
            document.getElementById('messages').innerHTML += buildChatItem(msg);
        })
    });
};