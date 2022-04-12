// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  await hre.run("compile");

  // We get the contract to deploy
  const Types = await ethers.getContractFactory("Types");
  const types = await Types.deploy();
  await types.deployed();
  console.log("Users deployed to:", types.address);

  const Users = await ethers.getContractFactory("Users", {
    libraries: {
      Types: types.address,
    },
  });
  const Products = await ethers.getContractFactory("Products");
  const SupplyChain = await ethers.getContractFactory("SupplyChain");

  const users = await Users.deploy();
  const products = await Products.deploy();
  const supplyChain = await SupplyChain.deploy(
    "Suresh",
    "suresh@geekyants.com"
  );

  await users.deployed();
  await products.deployed();
  await supplyChain.deployed();

  console.log("Users deployed to:", users.address);
  console.log("Products deployed to:", products.address);
  console.log("SupplyChain deployed to:", supplyChain.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
