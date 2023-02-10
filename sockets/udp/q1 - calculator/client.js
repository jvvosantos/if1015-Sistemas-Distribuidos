const dgram = require('dgram');
const client = dgram.createSocket('udp4');

const readLine = require('readline');

const rl = readLine.createInterface({
    input: process.stdin,
    output: process.stdout
});

client.on('message', (msg, rinfo) => {
    console.log(`[Server] ${msg}`)
});

rl.addListener('line', line => {
    client.send(line, 8081, 'localhost', (err) => {
        if (err){
            throw err;
        }
    });
});

console.log(`[Client started]`);
