// Starter file — add your code here

const fs = require('fs');

const readableStream = fs.createReadStream('assets/poem.txt');
const writableStream = fs.createWriteStream('assets/stream-output.txt');

readableStream.pipe(writableStream);

