let { Web3 } = require("web3");

let provider = new Web3.providers.HttpProvider("HTTP://127.0.0.1:7545");

let web3 = new Web3(provider);

const contractAddress = '0x8654Ca12026123932f9e23F42204632eb36B20d2'

const abi = [{"inputs":[{"internalType":"address","name":"_userAddress","type":"address"},{"internalType":"uint256","name":"_itemId","type":"uint256"},{"internalType":"uint256","name":"_totalPrice","type":"uint256"}],"name":"addTransaction","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_transactionId","type":"uint256"}],"name":"getTransaction","outputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"address","name":"","type":"address"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getTransactionsCount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"testFunction","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"pure","type":"function"},{"inputs":[],"name":"transactionCount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"transactions","outputs":[{"internalType":"uint256","name":"transactionId","type":"uint256"},{"internalType":"address","name":"userAddress","type":"address"},{"internalType":"uint256","name":"itemId","type":"uint256"},{"internalType":"uint256","name":"totalPrice","type":"uint256"}],"stateMutability":"view","type":"function"}]

const NumberStorage = new web3.eth.Contract(abi, contractAddress);

async function main() {

    await NumberStorage.methods.getTransactionsCount()
    .call()
    .then((result) => {
        console.log(`Transaction count: ${result}`);
    })
    .catch((error) => {
        console.error(error);
    });

    await NumberStorage.methods.addTransaction("0x0A8a30C1462E6402eaa4CDFE82a5715e0aC0a9d5", 1, 15)
    .send({ from: '0x207cf86ceeC1a74e0bffD8BBbdE7F03466CFe6Fb', gas: '1000000' })
    .on('transactionHash', (hash) => {
        console.log(`Transaction hash: ${hash}`);
    })
    .on('error', (error) => {
        console.error(error); 
    });


    await NumberStorage.methods.testFunction()
    .call()
    .then((result) => {
        console.log(`test function: ${result}`);
    })
    .catch((error) => {
        console.error(error);
    });

    await NumberStorage.methods.getTransaction(0)
    .call()
    .then((result) => {
        console.log(`transaction 1: \n transaction id: ${result[0]} \n User address: ${result[1]} \n item id: ${result[2]} \n total price: ${result[3]}`);
    })
    .catch((error) => {
        console.error(error);
    });
}

main();