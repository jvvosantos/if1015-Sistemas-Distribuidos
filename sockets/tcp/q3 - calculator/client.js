const net = require('net');
const readLine = require('readline');

const rl = readLine.createInterface({
    input: process.stdin,
    output: process.stdout
});

const client = new net.Socket();

client.connect(8391, 'localhost', () => {
    rl.addListener('line', line => {
        client.write(line);
    });

    client.on('data', (data) => {
        const msg = JSON.parse(data.toString());
        console.log(`[Server] ${msg.text}`);
    });
});