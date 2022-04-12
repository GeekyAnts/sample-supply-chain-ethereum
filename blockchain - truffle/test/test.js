// Add it in node project & try testing

const Web3 = require("web3");
const fs = require("fs");

function getWeb3() {
  return new Web3("http://localhost:7545");
}

function getSupplyChainContract(web3) {
  const abi = JSON.parse(
    fs.readFileSync("./SupplyChain.abi", {
      encoding: "utf-8",
    })
  );
  return new web3.eth.Contract(
    abi,
    "0x8f38648879e643981fF2fe4E67266Ba753664e47", // contract address
    {
      from: "0x53964CAde3Ab8343b1e02f0C1AB731aD8C1EFFb7", // local test account
      gas: 6721975,
    }
  );
}

async function addNewUser(supplyChainTest) {
  const user_ = await supplyChainTest.methods
    .addParty({
      id_: "0x43749733BB0A478cd47fC6c39903ed46630eDE9c",
      name: "Ruchika",
      email: "ruchika@geekyants.com",
      role: 1,
    })
    .send();
  console.log(user_);

  /*
  {
    transactionHash:
      "0x4e428192689450fbe95ebe5aa8df972fd395fc301ae195b4c176a7262d968777",
    transactionIndex: 0,
    blockHash:
      "0x15d9f2e88d3ba021933fd2b0e2214a839d089bcca5d39fe557f9a0a5b12afe5c",
    blockNumber: 53,
    from: "0x9083adec491c5113d164fc23e5f2a85e09de2a7a",
    to: "0x229857924b3abe77aa720c7582d03729b4c1ce79",
    gasUsed: 187571,
    cumulativeGasUsed: 187571,
    contractAddress: null,
    status: true,
    logsBloom:
      "0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000400000000000000000000000000000000020000000000000000000000010000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000008000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
    events: {
      newUser: {
        logIndex: 0,
        transactionIndex: 0,
        transactionHash:
          "0x4e428192689450fbe95ebe5aa8df972fd395fc301ae195b4c176a7262d968777",
        blockHash:
          "0x15d9f2e88d3ba021933fd2b0e2214a839d089bcca5d39fe557f9a0a5b12afe5c",
        blockNumber: 53,
        address: "0x229857924b3aBe77aa720C7582d03729B4C1cE79",
        type: "mined",
        id: "log_4d9aaca3",
        returnValues: [Result],
        event: "newUser",
        signature:
          "0xa02ce859974fc67911cca85c5c5afe5352b9c58f9dd06ff23e472e715288bf8f",
        raw: [Object],
      },
    },
  };
  */
}

async function getMyDetails(supplyChainTest) {
  const _userDetails = await supplyChainTest.methods.getMyDetails().call();
  console.log(_userDetails);

  /*
  [
    role: "0",
    id_: "0x9083adeC491C5113D164fc23E5f2a85E09DE2A7a",
    name: "Suresh",
    email: "suresh@geekyants.com",
  ]
  */
}

async function getUserDetails(supplyChainTest) {
  const _userDetails = await supplyChainTest.methods
    .getUserDetails("0x43749733BB0A478cd47fC6c39903ed46630eDE9c")
    .call();
  console.log(_userDetails);

  /*
  [
    role: "1",
    id_: "0x43749733BB0A478cd47fC6c39903ed46630eDE9c",
    name: "Ruchika",
    email: "ruchika@geekyants.com",
  ]
  */
}

async function getAllUserLinkedToMe(supplyChainTest) {
  const allUsers_ = await supplyChainTest.methods.getMyUsersList().call();
  console.log(allUsers_);

  /*
  [
    [
      role: "1",
      id_: "0x43749733BB0A478cd47fC6c39903ed46630eDE9c",
      name: "Ruchika",
      email: "ruchika@geekyants.com",
    ],
  ];
  */
}

async function addNewProduct(supplyChainTest) {
  const _product = await supplyChainTest.methods
    .addProduct(
      {
        name: "Pfizer covid vaccine",
        manufacturerName: "Pfizer",
        manufacturer: "0x53964CAde3Ab8343b1e02f0C1AB731aD8C1EFFb7",
        manDateEpoch: 1647942946, // Tuesday, 22 March 2022 09:55:45
        expDateEpoch: 1679459145, // Wednesday, 22 March 2023 09:55:45
        isInBatch: true,
        batchCount: 100,
        barcodeId: "p1",
        productImage:
          "https://cdn.wionews.com/sites/default/files/styles/story_page/public/2020/12/23/175391-pfizer-biontech-vaccine.jpg",
        productType: 1,
        scientificName: "SCARS-COVID-19",
        usage:
          "Take 2 shots with a minimum gap of 30 days & maximum gap of 180 days",
        composition: ["SO2 - 15%", "O2 - 30%"],
        sideEffects: ["Headace", "Motions"],
      },
      1648531140 // Current epoch time
    )
    .send();
  console.log(_product);

  /*
  {
    transactionHash:
      "0x8b8e39586ebc4ed350a903874b78802b8d3c2fe572b22f26fee00d52c0b87b45",
    transactionIndex: 0,
    blockHash:
      "0x4b4e0a09b648e2d330954b10d294d7fee1531c29b4680be9f9124c11599b323d",
    blockNumber: 54,
    from: "0x9083adec491c5113d164fc23e5f2a85e09de2a7a",
    to: "0x3e9128af35708f3ad3a71e10ad2a1253499dafa7",
    gasUsed: 1149132,
    cumulativeGasUsed: 1149132,
    contractAddress: null,
    status: true,
    logsBloom:
      "0x00000000000000000002000000008000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000400000000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000080000000000000000004000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
    events: {
      newProduct: {
        logIndex: 0,
        transactionIndex: 0,
        transactionHash:
          "0x8b8e39586ebc4ed350a903874b78802b8d3c2fe572b22f26fee00d52c0b87b45",
        blockHash:
          "0x4b4e0a09b648e2d330954b10d294d7fee1531c29b4680be9f9124c11599b323d",
        blockNumber: 54,
        address: "0x3E9128af35708F3aD3a71e10AD2a1253499dafa7",
        type: "mined",
        id: "log_7c9dff1b",
        returnValues: [Result],
        event: "newProduct",
        signature:
          "0x4e67620206f45c979fd626a9afb1e54cd88f49b8096154e3daa80b1d79b62a49",
        raw: [Object],
      },
    },
  };
  */
}

async function getAllProducts(supplyChainTest) {
  const _list = await supplyChainTest.methods.getAllProducts().call();
  console.log(_list);

  /*
  [
    [
      manufacturerName: "Pfizer",
      manufacturer: "0x9083adeC491C5113D164fc23E5f2a85E09DE2A7a",
      manDateEpoch: "1647942946",
      expDateEpoch: "1679459145",
      isInBatch: true,
      batchCount: "100",
      barcodeId: "p1",
      productImage:
        "https://cdn.wionews.com/sites/default/files/styles/story_page/public/2020/12/23/175391-pfizer-biontech-vaccine.jpg",
      productType: "1",
      scientificName: "SCARS-COVID-19",
      usage:
        "Take 2 shots with a minimum gap of 30 days & maximum gap of 180 days",
      composition: ["SO2 - 15%", "O2 - 30%"],
      sideEffects: ["Headace", "Motions"],
    ],
  ];
  */
}

async function getMyProducts(supplyChainTest) {
  const _myProducts = await supplyChainTest.methods.getMyProducts().call();
  console.log(_myProducts);

  /*
  [
    [
      manufacturerName: "Pfizer",
      manufacturer: "0x9083adeC491C5113D164fc23E5f2a85E09DE2A7a",
      manDateEpoch: "1647942946",
      expDateEpoch: "1679459145",
      isInBatch: true,
      batchCount: "100",
      barcodeId: "p1",
      productImage:
        "https://cdn.wionews.com/sites/default/files/styles/story_page/public/2020/12/23/175391-pfizer-biontech-vaccine.jpg",
      productType: "1",
      scientificName: "SCARS-COVID-19",
      usage:
        "Take 2 shots with a minimum gap of 30 days & maximum gap of 180 days",
      composition: ["SO2 - 15%", "O2 - 30%"],
      sideEffects: ["Headace", "Motions"],
    ],
  ];
  */
}

async function getSingleProduct(supplyChainTest) {
  const _singleProduct = await supplyChainTest.methods
    .getSingleProduct("p1")
    .call();
  console.log(_singleProduct);

  /*
  Result {
    0: [
      manufacturerName: "Pfizer",
      manufacturer: "0x9083adeC491C5113D164fc23E5f2a85E09DE2A7a",
      manDateEpoch: "1647942946",
      expDateEpoch: "1679459145",
      isInBatch: true,
      batchCount: "100",
      barcodeId: "p1",
      productImage:
        "https://cdn.wionews.com/sites/default/files/styles/story_page/public/2020/12/23/175391-pfizer-biontech-vaccine.jpg",
      productType: "1",
      scientificName: "SCARS-COVID-19",
      usage:
        "Take 2 shots with a minimum gap of 30 days & maximum gap of 180 days",
      composition: ["SO2 - 15%", "O2 - 30%"],
      sideEffects: ["Headace", "Motions"],
    ],
    1: [
      manufacturer: [
        id_: "0x9083adeC491C5113D164fc23E5f2a85E09DE2A7a",
        date: "1648531140",
      ],
      supplier: [
        id_: "0x0000000000000000000000000000000000000000",
        date: "0",
      ],
      vendor: [
        id_: "0x0000000000000000000000000000000000000000",
        date: "0",
      ],
      customers: [],
    ],
  }
  */
}

async function sellProduct(supplyChainTest) {
  const _sellProduct = await supplyChainTest.methods
    .sellProduct("0x43749733BB0A478cd47fC6c39903ed46630eDE9c", "p1", 1648797939)
    .send();
  console.log(_sellProduct);
}

async function main() {
  const web3 = getWeb3();
  const supplyChainTest = getSupplyChainContract(web3);

  try {
    await addNewUser(supplyChainTest);
    // await getMyDetails(supplyChainTest);
    // await getUserDetails(supplyChainTest);
    // await getAllUserLinkedToMe(supplyChainTest);
    await addNewProduct(supplyChainTest);
    // await getAllProducts(supplyChainTest);
    // await getMyProducts(supplyChainTest);
    await sellProduct(supplyChainTest);
    await getSingleProduct(supplyChainTest);
  } catch (e) {
    console.log("Catch: ", e);
  }
}

main();
