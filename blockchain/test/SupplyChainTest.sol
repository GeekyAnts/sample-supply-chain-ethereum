// // SPDX-License-Identifier: GPL-3.0

// pragma solidity >=0.4.25 <0.9.0;

// import "../contracts/SupplyChain.sol";

// contract SupplyChainTest {
//     SupplyChain supplyChainToTest =
//         new SupplyChain("Suresh", "suresh@geekyanst.com");

//     function addAndGetProduct() public {
//         supplyChainToTest.addProduct({
//             product_: Product({
//                 manufacturerName: "Pfizer",
//                 manufacturer: address(0),
//                 manDateEpoch: 1647942946, // Tuesday, 22 March 2022 09:55:45
//                 expDateEpoch: 1679459145, // Wednesday, 22 March 2023 09:55:45
//                 isInBatch: true,
//                 batchCount: 100,
//                 barcodeId: "p1",
//                 productImage: "",
//                 productType: "RNA",
//                 scientificName: "SCARS-COVID-19",
//                 usage: "Take 2 shots with a minimum gap of 30 days & maximum gap of 180 days",
//                 composition: ["SO2 - 15%", "O2 - 30%"],
//                 sideEffects: ["Headace", "Motions"]
//             }),
//             currentTime_: 1647943384
//         });
//         assert.equal(
//             supplyChainToTest.getSingleProducts("p1")[0].manufacturerName,
//             "Pfizer",
//             "It should be Pfizer since we passed barcode ID of Pfizer"
//         );
//     }
// }
