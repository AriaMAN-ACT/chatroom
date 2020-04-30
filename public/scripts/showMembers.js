const showMembers = members => {
    document.querySelector('.curr-room-num-users').innerHTML =
        `${members} <span class="glyphicon glyphicon-user"></span>`;
};