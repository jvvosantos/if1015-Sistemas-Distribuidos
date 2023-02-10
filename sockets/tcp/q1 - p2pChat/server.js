const net = require('net');
const readLine = require('readline');

const handleConnection = socket => {
    console.log('[Cliente conectado]');

    socket.on('end', () => {
        console.log('[Cliente desconectado]');
    });

    socket.on('data', data => {
        const str = data.toString();
        if (str === 'end'){
            socket.end();
        }

        console.log(`Cliente diz: ${str}`);
    });
}

const server = net.createServer(handleConnection);
server.listen(8391, 'localhost');