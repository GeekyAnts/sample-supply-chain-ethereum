const Types = artifacts.require("Types");
const Users = artifacts.require("Users");
const Products = artifacts.require("Products");
const SupplyChain = artifacts.require("SupplyChain");

module.exports = async function (deployer, network, accounts) {
  if (network == "development") {
    deployer.deploy(Types);
    deployer.link(Types, Users);
    deployer.deploy(Users);
    deployer.link(Types, Products);
    deployer.deploy(Products);
    deployer.deploy(SupplyChain, "Suresh", "suresh@geekyants.com");
  } else {
    // For live & test networks it comes here
    deployer.deploy(Types);
    deployer.link(Types, Users);
    deployer.deploy(Users);
    deployer.link(Types, Products);
    deployer.deploy(Products);
    deployer.deploy(SupplyChain, "Suresh", "suresh@geekyants.com");
  }
};
