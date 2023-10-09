# Write smart contract with truffle

## Available Scripts

In the project directory, you can run:

### `truffle compile`

Run this command to compile your contracts.

### `truffle deploy`

Run this command to compile the contracts and start the migrations. Result:

```

Deploying 'DAppStorage'
   -----------------------
   > transaction hash:    0x48e58cd3adbb9075225b29feb366c2c6796f9289ea9c5668ed9b4c315948a76c
   > Blocks: 0            Seconds: 0
   > contract address:    0x8654Ca12026123932f9e23F42204632eb36B20d2
   > block number:        31
   > block timestamp:     1696815539
   > account:             0x207cf86ceeC1a74e0bffD8BBbdE7F03466CFe6Fb
   > balance:             99.962092974986851755
   > gas used:            331588 (0x50f44)
   > gas price:           2.51661406 gwei
   > value sent:          0 ETH
   > total cost:          0.00083447902292728 ETH

   > Saving artifacts
   -------------------------------------
   > Total cost:     0.00083447902292728 ETH

Summary
=======
> Total deployments:   1
> Final cost:          0.00083447902292728 ETH

```

### `npm install -g solc`

Run this command to install solidity compiler.

     
### `solcjs --abi --bin contracts/DAppStorage.sol`

Run this command to get abi using Solidity Compiler.


### `interact.js`

In the interact.js file, replace the contract address and abi with the generated address and abi from the steps above.

```

const contractAddress = 'your_contract_address'
const abi = [your_abi]
const NumberStorage = new web3.eth.Contract(abi, contractAddress);

```

### `node interact.js`

Run this command to execute the interact.js to test the functions in the smart contract. Result: 

```

Transaction count: 5
Transaction hash: 0x9b092e63bd6e3fa37013b3d764f0a6ecd1355f4092c879bf8e0f20e57f3bf176
test function: 12345
transaction 1: 
 transaction id: 4
 User address: 0x0A8a30C1462E6402eaa4CDFE82a5715e0aC0a9d5
 item id: 1
 total price: 15
 
 ```