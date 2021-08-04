const Migrations = artifacts.require("Arti");

module.exports = function (deployer) {
  deployer.deploy(Migrations);
};
