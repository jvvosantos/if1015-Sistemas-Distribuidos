const net = require('net');
const readLine = require('readline');

const rl = readLine.createInterface({
    input: process.stdin,
    output: process.stdout
});

const client = new net.Socket();

client.connect(8391, 'localhost', () => {
    console.log('[Conectado ao servidor]');

    rl.addListener('line', line => {
        client.write(line);
    });
});