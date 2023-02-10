const dgram = require('dgram');
const socket = dgram.createSocket('udp4');

const sum = (x, y) => {
    return x + y;
}

const sub = (x, y) => {
    return x - y;
}

const mult = (x, y) => {
    return x * y;
}

const div = (x, y) => {
    return x / y;
}

const sendMessage = (line, senderPort, senderAddr) => {
    socket.send(line, senderPort, senderAddr, (err) => {
        if (err){
            throw err;
        }
    });
}

var senderAddr;
var senderPort;

socket.on('message', (msg, rinfo) => {
    senderAddr = rinfo.address;
    senderPort = rinfo.port;
    
    let ops = msg.toString().split(' ');
    let res;

    switch(ops[1]){
        case '+':
            res = sum(Number.parseInt(ops[0]), Number.parseInt(ops[2])).toString();
            break;
        case '-':
            res = sub(Number.parseInt(ops[0]), Number.parseInt(ops[2])).toString();
            break;
        case '*':
            res = mult(Number.parseInt(ops[0]), Number.parseInt(ops[2])).toString();
            break;
        case '/':
            res = div(Number.parseInt(ops[0]), Number.parseInt(ops[2])).toString();
            break;
        default:
            res = 'Please use format x <op> y, where op is one of {+, -, *, /}';
    }

    sendMessage(res, senderPort, senderAddr);
});

socket.bind(8081);

console.log(`[Server started]`);
