// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.6.0 <0.9.0;

pragma experimental ABIEncoderV2; // Enable ABIEncoderV2

contract DAppStorage {
    struct Transaction {
        uint256 id;
        address userAddress;
        uint256 dbTransactionIds;
    }

    Transaction[] public transactions;
    uint256 public transactionCount;

    function addTransaction(address _userAddress, uint256[] memory _transactionIds, uint256 _totalPrice) public payable {
        require(msg.value >= _totalPrice, "Insufficient payment");
        if (msg.value > _totalPrice) {
            payable(msg.sender).transfer(msg.value - _totalPrice);
        }
        for (uint256 i = 0; i < _transactionIds.length; i++) {
            require(!isTransactionIdUsed(_transactionIds[i]), "Transaction ID already exists");
            transactions.push(Transaction(transactionCount, _userAddress, _transactionIds[i]));
            transactionCount++;
        }
    }

    function getAllTransaction() public view returns (uint256[] memory) {
        require(transactionCount > 0, "Transaction does not exist");
        uint256[] memory transactionArr = new uint256[](transactionCount);
        for (uint256 i = 0; i < transactionCount; i++) {
            transactionArr[i] = transactions[i].dbTransactionIds;
        }
        return transactionArr;
    }

    function isTransactionIdUsed(uint256 _transactionId) internal view returns (bool) {
        for (uint256 i = 0; i < transactionCount; i++) {
            if (transactions[i].dbTransactionIds == _transactionId) {
                return true;
            }
        }
        return false;
    }
}
