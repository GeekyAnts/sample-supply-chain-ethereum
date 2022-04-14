// SPDX-License-Identifier: GPL-3.0
pragma experimental ABIEncoderV2;
pragma solidity >=0.4.25 <0.9.0;

import "./Types.sol";

/**
 * @title Products
 * @author Suresh Konakanchi | GeekyAnts
 * @dev Library for managing products
 */
contract Products {
    Types.Product[] internal products;
    mapping(string => Types.Product) internal product;
    mapping(address => string[]) internal userLinkedProducts;
    mapping(string => Types.ProductHistory) internal productHistory;

    // Events

    event NewProduct(
        string name,
        string manufacturerName,
        string scientificName,
        string barcodeId,
        uint256 manDateEpoch,
        uint256 expDateEpoch
    );
    event ProductOwnershipTransfer(
        string name,
        string manufacturerName,
        string scientificName,
        string barcodeId,
        string buyerName,
        string buyerEmail
    );

    // Contract Methods

    /**
     * @dev To get all the products linked a particular user
     * @return productsList All the products that were linked to current logged-in user
     */
    function getUserProducts() internal view returns (Types.Product[] memory) {
        string[] memory ids_ = userLinkedProducts[msg.sender];
        Types.Product[] memory products_ = new Types.Product[](ids_.length);
        for (uint256 i = 0; i < ids_.length; i++) {
            products_[i] = product[ids_[i]];
        }
        return products_;
    }

    /**
     * @dev Get single product
     * @param barcodeId_ Unique ID of the product
     * @return product_ Details of the product & it's timeline
     * @return history_ product lifecycle, who purchased when
     */
    function getSpecificProduct(string memory barcodeId_)
        internal
        view
        returns (Types.Product memory, Types.ProductHistory memory)
    {
        return (product[barcodeId_], productHistory[barcodeId_]);
    }

    /**
     * @dev Adds new product to the products list
     * @param product_ unique ID of the product
     * @param currentTime_ Current Date, Time in epoch (To store when it got added)
     */
    function addAProduct(Types.Product memory product_, uint256 currentTime_)
        internal
        productNotExists(product_.barcodeId)
    {
        require(
            product_.manufacturer == msg.sender,
            "Only manufacturer can add"
        );
        products.push(product_);
        product[product_.barcodeId] = product_;
        productHistory[product_.barcodeId].manufacturer = Types.UserHistory({
            id_: msg.sender,
            date: currentTime_
        });
        userLinkedProducts[msg.sender].push(product_.barcodeId);
        emit NewProduct(
            product_.name,
            product_.manufacturerName,
            product_.scientificName,
            product_.barcodeId,
            product_.manDateEpoch,
            product_.expDateEpoch
        );
    }

    /**
     * @dev Transfer the ownership
     * @param partyId_ Purchase user's account address
     * @param barcodeId_ unique ID of the product
     * @param currentTime_ Current Date Time in epoch to keep track of the history
     */
    function sell(
        address partyId_,
        string memory barcodeId_,
        Types.UserDetails memory party_,
        uint256 currentTime_
    ) internal productExists(barcodeId_) {
        Types.Product memory product_ = product[barcodeId_];

        // Updating product history
        Types.UserHistory memory userHistory_ = Types.UserHistory({
            id_: party_.id_,
            date: currentTime_
        });
        if (Types.UserRole(party_.role) == Types.UserRole.Supplier) {
            productHistory[barcodeId_].supplier = userHistory_;
        } else if (Types.UserRole(party_.role) == Types.UserRole.Vendor) {
            productHistory[barcodeId_].vendor = userHistory_;
        } else if (Types.UserRole(party_.role) == Types.UserRole.Customer) {
            productHistory[barcodeId_].customers.push(userHistory_);
        } else {
            // Not in the assumption scope
            revert("Not valid operation");
        }
        transferOwnership(msg.sender, partyId_, barcodeId_); // To transfer ownership from seller to buyer

        // Emiting event
        emit ProductOwnershipTransfer(
            product_.name,
            product_.manufacturerName,
            product_.scientificName,
            product_.barcodeId,
            party_.name,
            party_.email
        );
    }

    // Modifiers

    /**
     * @notice To check if product exists
     * @param id_ product barcode ID
     */
    modifier productExists(string memory id_) {
        require(!compareStrings(product[id_].barcodeId, ""));
        _;
    }

    /**
     * @notice To check if product doesn not exists
     * @param id_ product barcode ID
     */
    modifier productNotExists(string memory id_) {
        require(compareStrings(product[id_].barcodeId, ""));
        _;
    }

    // Internal functions

    /**
     * @dev To remove the product from current list once sold
     * @param sellerId_ Seller's metamask address
     * @param buyerId_ Buyer's metamask address
     * @param productId_ unique ID of the product
     */
    function transferOwnership(
        address sellerId_,
        address buyerId_,
        string memory productId_
    ) internal {
        userLinkedProducts[buyerId_].push(productId_);
        string[] memory sellerProducts_ = userLinkedProducts[sellerId_];
        uint256 matchIndex_ = (sellerProducts_.length + 1);
        for (uint256 i = 0; i < sellerProducts_.length; i++) {
            if (compareStrings(sellerProducts_[i], productId_)) {
                matchIndex_ = i;
                break;
            }
        }
        assert(matchIndex_ < sellerProducts_.length); // Match found
        if (sellerProducts_.length == 1) {
            delete userLinkedProducts[sellerId_];
        } else {
            userLinkedProducts[sellerId_][matchIndex_] = userLinkedProducts[
                sellerId_
            ][sellerProducts_.length - 1];
            delete userLinkedProducts[sellerId_][sellerProducts_.length - 1];
            userLinkedProducts[sellerId_].pop();
        }
    }

    /**
     * @notice Internal function which doesn't alter any stage or read any data
     * Used to compare the string operations. Little costly in terms of gas fee
     * @param a string-1 that is to be compared
     * @param b string-2 that is to be compared
     */
    function compareStrings(string memory a, string memory b)
        internal
        pure
        returns (bool)
    {
        return (keccak256(abi.encodePacked((a))) ==
            keccak256(abi.encodePacked((b))));
    }
}
