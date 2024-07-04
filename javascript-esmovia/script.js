const {factorial} = require('./factorial');
const prompt = require("prompt-sync")();

//challenge 1

//challenge 4

async function main() {
    let number = prompt("Enter your number: ");
    const result = await factorial(number);
    console.log('Factorial result:', result);
}

main();