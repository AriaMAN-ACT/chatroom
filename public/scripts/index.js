const username = prompt("select Username");

const socket = io('http://localhost:3000', {
    query: {
        username
    }
});

handleNamespaces(socket);