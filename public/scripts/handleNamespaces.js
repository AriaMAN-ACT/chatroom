const handleNamespaces = socket => {
    socket.on('nsList', nsData => {
        const namespacesDiv = document.getElementById('namespaces');
        namespacesDiv.innerHTML = '';
        nsData.forEach(ns => {
            namespacesDiv.innerHTML += `<div class="namespace"><img src="${ns.image}"</div>`;
        });
        selectNamespace(nsData, 0, socket);

        Array.from(document.getElementsByClassName('namespace')).forEach((element, index) => {
            element.addEventListener('click', event => {
                selectNamespace(nsData, index);
            });
        });
    });
};