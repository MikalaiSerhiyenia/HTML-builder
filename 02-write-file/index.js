const fs = require('fs');
const readline = require('readline');

const filePath = './02-write-file/text.txt';
const writeStream = fs.createWriteStream(filePath);
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

console.log('Hi!');

rl.on('line', (inputText) => {
  if (inputText.toLowerCase() === 'exit') {
    console.log('Bye!');
    rl.close();
    writeStream.end();
  } else {
    writeStream.write(inputText + '\n');
  }
});

rl.on('close', () => {
  console.log('Exit.');
});
