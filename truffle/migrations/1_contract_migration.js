/* eslint-disable no-undef */
var DAppStorage = artifacts.require("DAppStorage");
/* eslint-enable no-undef */

module.exports = function(deployer) {
    deployer.deploy(DAppStorage);
};