import expect from "chai";
import ethers from "hardhat";

describe("SupplyChain", function () {
  it("Should return the new product once it's added", async function () {
    const Users = await ethers.getContractFactory("Users");
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

    const [owner, addr1] = await ethers.getSigners();

    const user_ = await supplyChain
      .connect(addr1)
      .addParty({
        id_: "0x90f79bf6eb2c4f870365e785982e1f101e93b906",
        name: "Ruchika",
        email: "ruchika@geekyants.com",
        role: 1,
      })
      .send();
    await user_.wait();
    console.log(user_);

    const addedProduct_ = await supplyChain.connect(addr1).addProduct(
      {
        manufacturerName: "Pfizer",
        manufacturer: addr1.toString(),
        manDateEpoch: 1647942946, // Tuesday, 22 March 2022 09:55:45
        expDateEpoch: 1679459145, // Wednesday, 22 March 2023 09:55:45
        isInBatch: true,
        batchCount: 100,
        barcodeId: "p1",
        productImage: "",
        productType: "RNA",
        scientificName: "SCARS-COVID-19",
        usage:
          "Take 2 shots with a minimum gap of 30 days & maximum gap of 180 days",
        composition: ["SO2 - 15%", "O2 - 30%"],
        sideEffects: ["Headace", "Motions"],
      },
      1647943384
    );

    // wait until the transaction is mined
    await addedProduct_.wait();
    const singleProduct_ = await supplyChain.getSingleProducts("p1");
    console.log(singleProduct_);

    const _sellProduct = await supplyChain
      .connect(addr1)
      .sellProduct(
        "0x90f79bf6eb2c4f870365e785982e1f101e93b906",
        "p1",
        1648797939
      )
      .send();
    // wait until the transaction is mined
    await _sellProduct.wait();
    console.log(_sellProduct);

    expect(singleProduct_[0].manufacturerName).to.equal("Pfizer");
  });
});
