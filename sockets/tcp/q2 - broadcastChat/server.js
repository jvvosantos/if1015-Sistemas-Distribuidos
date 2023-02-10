const net = require('net');
const readLine = require('readline');

const connections = [];

const handleConnection = (socket) => {
    let active = false;
    let name;

    sendMessage(socket, 'Welcome! Please enter your name.', 0);

    socket.on('data', data => {
        const msg = data.toString();
        if (!active){
            if (connections.find(c => c.name === msg)){
                sendMessage(socket, 'Sorry, this name is already taken', 0);
                return;
            }

            sendMessage(socket, 'Welcome to the chat!', 0);
            name = msg;

            active = true;
            connections.push({
                name,
                socket,
                active
            });
            broadcast(`${name} has joined the chat!`, 0, name);
        }
        else {
            broadcast(msg, 1, name);
        }
    });

    socket.on('end', () => {
        if (active) {
            broadcast(`${name} left the chat!`, 0, name);
            removeConnection(name);
        }
    });
}

const broadcast = (text, type, from) => {
    connections.filter(conn => conn.active && conn.name !== from).forEach(conn => {
        sendMessage(conn.socket, text, type, from);
    })
};

const sendMessage = (socket, text, type, from) => {
    socket.write(JSON.stringify({
        text,
        type,
        from
    }));
};

const removeConnection = (name) => {
    connections.splice(connections.indexOf(connections.find(c => c.name === name)), 1);
}

const server = net.createServer(handleConnection);
server.listen(8391, 'localhost');