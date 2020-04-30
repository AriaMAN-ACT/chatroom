const showMembers = data => {
    document.querySelector('.curr-room-num-users').innerHTML =
        `${data.members.length} <span class="glyphicon glyphicon-user"></span>`;

    document.querySelector('.curr-room-text').innerHTML = data.room;
};