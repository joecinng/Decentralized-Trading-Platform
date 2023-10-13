// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.6.0 <0.9.0;

pragma experimental ABIEncoderV2; // Enable ABIEncoderV2

contract DAppStorage {
    struct Transaction {
        uint256 id;
        address userAddress;
        uint256 dbAssetId;
    }

    Transaction[] public transactions;
    uint256 public transactionCount;

    function addTransaction(address _userAddress, uint256[] memory _dbAssetId, uint256 _totalPrice) public payable {
        require(msg.value >= _totalPrice, "Insufficient payment");
        for (uint256 i = 0; i < _dbAssetId.length; i++) {
            require(!isTransactionIdUsed(_dbAssetId[i]), "Asset ID already exists");
            transactions.push(Transaction(transactionCount, _userAddress, _dbAssetId[i]));
            transactionCount++;
        }
        if (msg.value > _totalPrice) {
            payable(msg.sender).transfer(msg.value - _totalPrice);
        }
    }

    function getAllTransaction() public view returns (uint256[] memory) {
        require(transactionCount > 0, "Transaction does not exist");
        uint256[] memory assetArr = new uint256[](transactionCount);
        for (uint256 i = 0; i < transactionCount; i++) {
            assetArr[i] = transactions[i].dbAssetId;
        }
        return assetArr;
    }

    function isTransactionIdUsed(uint256 _dbAssetId) internal view returns (bool) {
        for (uint256 i = 0; i < transactionCount; i++) {
            if (transactions[i].dbAssetId == _dbAssetId) {
                return true;
            }
        }
        return false;
    }
}
