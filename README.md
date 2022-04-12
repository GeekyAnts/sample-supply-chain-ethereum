## Pfizer's Supply Chain Management (Life saving drugs)

<p align="center">
  <img width="600"  src="https://github.com/GeekyAnts/sample-supply-chain-ethereum/blob/main/assets/home.png?raw=true">
</p>

https://hbr.org/2020/05/building-a-transparent-supply-chain // Take reference for article Pushkar

## Problem

Lack of vaccine monitoring bodies can hamper purchase, delivery, monitoring, and transparency in the VSC. Supply chains around the globe are confronting significant interruption, and the lack of correspondence between supply chain members can impede a proper production and distribution of the COVID-19 vaccine.

## Solution

By managing the supply chain, companies can cut excess costs and deliver products to the consumer faster.

-- From article

### Implementation of Supply Chain Management:

### Required:

- Users Role: Manufacturer, Suppliers, Vendors & Costomers
- Smart Contract consisting of all the rules and protocols required for Supply chain Management. We have created 2 contacts for Users and Products, and inherited those contract within main supply-chain contract.
- Blockchain Network to deploy the Contract. We have used Rinkeby for our contract.
- Website for user Interface where Users according to their role can access informfation. We have created webpage with React & Native Base.

## Assumptions:

- One Manufacturer. Here we took Pfizer reference for the critical Life Saving drugs Manufacturer.
- Only Manufacturer can add the products to Inventory.
- Manufacturer can only add Supplier to the database and sell the products to Suppliers.
- Supplier can only add Vendors to the database and sell the products to Vendors.
- Vendors can only add Customers to the database and sell the products to Customers.
- All the user roles should have mandatory metamask address on the network except Customers. Customers may or may not have meta mask address.
- Product details and supply chain lifecycle should be public to all the users.

## How it works

<p align="center">
  <img width="600"  
      alt='supply-chain-flowdiagram'
       src="https://github.com/GeekyAnts/sample-supply-chain-ethereum/blob/main/assets/supply-chain-flow-diagram.jpg?raw=true">
</p>

## How the product ownership get transfer

<p align="center">
  <img width="600"  
      alt='supply-chain-flowdiagram'
       src="https://github.com/GeekyAnts/sample-supply-chain-ethereum/blob/main/assets/product-ownership-transfer.jpg?raw=true">
</p>

# Let's start with E-Voting Smart Contracts

[Do platform Setup! ](SETUP.md)

## Solidity

### Supply Chain Objects

```c++
    // Users
    enum UserRole {
        Manufacturer,
        Supplier,
        Vendor,
        Customer
    }
    struct UserDetails {
        UserRole role;
        address id_;
        string name;
        string email;
    }

    // Products
    enum ProductType {
        BCG,
        RNA,
        MRNA,
        MMR,
        NasalFlu
    }
    struct Product {
        string name;
        address manufacturer;
        uint256 manDateEpoch;
        uint256 expDateEpoch;
        bool isInBatch; // few products will be packed & sold in batches
        uint256 batchCount; // QTY that were packed in single batch
        string barcodeId;
        string productImage;
        ProductType productType;
        string scientificName;
        string usage;
        string[] composition;
        string[] sideEffects;
    }

    // Products History
    struct UserHistory {
        address id_; // account Id of the user
        uint256 date; // Added, Purchased date in epoch in UTC timezone
    }
    struct ProductHistory {
        UserHistory manufacturer;
        UserHistory supplier;
        UserHistory vendor;
        UserHistory[] customers;
    }
```

### Supply Chain functions list

| **Function Name**  | **Input Params**                                                  | **Return value**           | **Description**                                                                |
| ------------------ | ----------------------------------------------------------------- | -------------------------- | ------------------------------------------------------------------------------ |
| getMyDetails()     | -                                                                 | UserDetails                | To get the details of the current logged-in user                               |
| getMyUsersList()   | -                                                                 | UserDetails[]              | To get all the users that current logged-in user has added                     |
| getUserDetails()   | metamask `address` of user                                        | UserDetails                | To get the details of the current logged-in user                               |
| addParty()         | UserDetails                                                       | -                          | To add vendors, Suppliers & customer's prior                                   |
| getAllProducts()   | -                                                                 | Product[]                  | To get all the products list                                                   |
| getSingleProduct() | barcodeId                                                         | Product,<br>ProductHistory | To get the details of the single product along with the history of the product |
| getMyProducts()    | -                                                                 | Product[]                  | To get all the products that were linked to current logged-in user             |
| addProduct()       | Product,<br>`currentTime` in epoch                                | -                          | To add a new product to the system. Only manufacturer can add the products     |
| sellProduct()      | party metamask `address`,<br>barcodeId,<br>`currentTime` in epoch | -                          | To trasnfer the ownership to next level (By the selling-buying concept)        |

### Events

| **Event Name**           | **Params**                                                                          | **Description**                                                              |
| ------------------------ | ----------------------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| newUser                  | name<br>email<br>`role`'s index                                                     | When a new user is added, it gets triggered with the public details          |
| lostUser                 | name<br>email<br>`role`'s index                                                     | When a user is removed from the system, this gets triggered                  |
| newProduct               | manufacturerName,<br>scientificName,<br>barcodeId,<br>manDateEpoch,<br>expDateEpoch | Triggers when a new product is added to system by the manufacturer           |
| productOwnershipTransfer | manufacturerName,<br>scientificName,<br>barcodeId,<br>buyerName,<br>buyerEmail      | When the product is sold to next level in the cycle then this gets triggered |

### Versions

Compiler: solc: 0.8.12+commit.f00d7308

Truffle: v5.5.2

Node: v14.17.0

### Deployed to Rinkeby

Contract Address: https://rinkeby.etherscan.io/address/0xB6976cfdA272536c51b0F251855EDa48164485EF

Contract Creator: https://rinkeby.etherscan.io/address/0xF2C9ef86c3c98Fc8C265469624dA35af2D72Fa06

Tx Hash of contract creation :https://rinkeby.etherscan.io/tx/0x6e0f54b7579fc6e9fcd00aa37d182ab2896471461f46ca09a21f63368bf12eb4

### Quick Start

1.  cd into project repro

        cd sample-supply-chain-ethereum
        cd blockchain

2.  download node libraries

        npm install

3.  Download/Start ganache

https://truffleframework.com/ganache

4.  Compiling contracts

        truffle compile

5.  Migrating to ganache

_Note depending on ganache cli/ui you my need to change truffle.js port settings Current listing on port : 7545_

        truffle migrate --network development  --reset --all

6.  Testing on ganache

        truffle test

7.  Switch to FrontEnd & Testing

_Note Change settings to your Contract address to point to local_

          cd ..
          cd front-end
          npm install
          npm start

8.  Migrating to Rinkeby

_Note Change truffle settings to your Contract Creator address within the "from" rinkeby configuration_

        truffle migrate --network rinkeby  --reset --all

9.  Start FrontEnd on Rinkeby

_Note Revert back all your local configurations & configure it to point to rinkeby_

        npm start

# How frontend works

## Pfizer Home

<br>
<img src="https://github.com/GeekyAnts/sample-supply-chain-ethereum/blob/main/assets/home.png?raw=true"><br>
<br>

## Pfizer Products

<br>
<img src="https://github.com/GeekyAnts/sample-supply-chain-ethereum/blob/main/assets/products.png?raw=true"><br>
<br>

## Add Users according to Role and View all added Users

<br>
<img src="https://github.com/GeekyAnts/sample-supply-chain-ethereum/blob/main/assets/add-view-users.png?raw=true"><br>
<br>

## Product Add Form by Manufacturer

<br>
<img src="https://github.com/GeekyAnts/sample-supply-chain-ethereum/blob/main/assets/addproduct-1.png?raw=true"><br>
<br>

<img src="https://github.com/GeekyAnts/sample-supply-chain-ethereum/blob/main/assets/addproduct-2.png?raw=true"><br>
<br>

## Products Sell according to User's role

<br>
<img src="https://github.com/GeekyAnts/sample-supply-chain-ethereum/blob/main/assets/sell_product.png?raw=true"><br>
<br>

## Products details and History

<br>
<img src="https://github.com/GeekyAnts/sample-supply-chain-ethereum/blob/main/assets/product-detail-history.png?raw=true"><br>
