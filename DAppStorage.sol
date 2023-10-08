// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.6.0 <0.9.0;

contract DAppStorage {
    
    struct Transaction {
        uint256 transactionId;
        address userAddress;
        uint256 itemId;
        uint256 totalPrice;
    }

    Transaction[] public transactions;
    uint256 public transactionCount;


    function addTransaction(address _userAddress, uint256 _itemId, uint256 _totalPrice) public {
        uint256 newTransactionId = transactionCount++;
        transactions.push(Transaction(newTransactionId, _userAddress, _itemId, _totalPrice));
    }

    function getTransactionsCount() public view returns (uint256) {
        return transactionCount;
    }

    function getTransaction(uint256 _transactionId) public view returns (uint256, address, uint256, uint256) {
        require(_transactionId < transactionCount, "Transaction does not exist");
        Transaction memory transaction = transactions[_transactionId];
        return (transaction.transactionId, transaction.userAddress, transaction.itemId, transaction.totalPrice);
    }
}