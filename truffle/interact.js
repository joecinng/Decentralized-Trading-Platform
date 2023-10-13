let { Web3 } = require("web3");

let provider = new Web3.providers.HttpProvider("HTTP://127.0.0.1:7545");

let web3 = new Web3(provider);

const contractAddress = '0x58Aa61C30fFfC0ee70063eFca151DDc0C5d9cdfb';

const abi = [{"inputs":[{"internalType":"address","name":"_userAddress","type":"address"},{"internalType":"uint256[]","name":"_dbAssetId","type":"uint256[]"},{"internalType":"uint256","name":"_totalPrice","type":"uint256"}],"name":"addTransaction","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"getAllTransaction","outputs":[{"internalType":"uint256[]","name":"","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"transactionCount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"transactions","outputs":[{"internalType":"uint256","name":"id","type":"uint256"},{"internalType":"address","name":"userAddress","type":"address"},{"internalType":"uint256","name":"dbAssetId","type":"uint256"}],"stateMutability":"view","type":"function"}];

const NumberStorage = new web3.eth.Contract(abi, contractAddress);

async function main() {

    const senderAddress = '0x054b7E0d352AED8fd695dDf78234e86ADE7d2131'; 
    const assetsId = [105]; 
    const totalPrice = web3.utils.toWei('2', 'ether');

    // Prepare the transaction object
    const transactionObject = {
        from: senderAddress,
        to: contractAddress,
        value: totalPrice,
        gas: 1000000
    };

    // Call the addTransaction function
    await NumberStorage.methods.addTransaction(senderAddress, assetsId, totalPrice)
    .send(transactionObject)
    .on('transactionHash', function (hash) {
        console.log('Transaction Hash: ' + hash);
    })
    .on('receipt', (receipt) => {
        if (receipt.status) {
            console.log('Transaction successful' + receipt.status);
            // You can handle success here and redirect to the confirmation page.
        } else {
            console.log('Transaction failed');
            // Handle the failure here.
        }
    })
    .on('error', function (error) {
        console.error('Transaction Error: ' + error);
    })

    await NumberStorage.methods.getAllTransaction()
    .call()
    .then((result) => {
        console.log(`${result}`);
    })
    .catch((error) => {
        console.error(error);
    });
}

main();