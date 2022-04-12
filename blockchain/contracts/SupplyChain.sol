// SPDX-License-Identifier: GPL-3.0
pragma experimental ABIEncoderV2;
pragma solidity >=0.4.25 <0.9.0;

import "./Products.sol";
import "./Users.sol";

/**
 * @title SupplyChain
 * @author Suresh Konakanchi | GeekyAnts
 * @dev Implements the transparency in the supply chain to
 * understand the actual user & the flow of the products/medicines
 */
contract SupplyChain is Users, Products {
    /**
     * @dev Create a new SupplyChain with the provided 'manufacturer'
     * @param name_ Name of the manufacturer
     * @param email_ Email of the manufacturer
     */
    constructor(string memory name_, string memory email_) {
        Types.UserDetails memory mn_ = Types.UserDetails({
            role: Types.UserRole.Manufacturer,
            id_: msg.sender,
            name: name_,
            email: email_
        });
        add(mn_);
    }

    /**
     * @dev To get All the products list.
     * @return productsList All the products that were added so far
     */
    function getAllProducts() public view returns (Types.Product[] memory) {
        return products;
    }

    /**
     * @dev To get all the products linked a particular user
     * @return productsList All the products that were linked to current logged-in user
     */
    function getMyProducts() public view returns (Types.Product[] memory) {
        return getUserProducts();
    }

    /**
     * @dev Get single product
     * @param barcodeId_ Unique ID of the product
     * @return product_ Details of the product & it's timeline
     * @return history_ product lifecycle, who purchased when
     */
    function getSingleProduct(string memory barcodeId_)
        public
        view
        returns (Types.Product memory, Types.ProductHistory memory)
    {
        return getSpecificProduct(barcodeId_);
    }

    /**
     * @dev Adds new product to the products list
     * @param product_ unique ID of the product
     * @param currentTime_ Current Date, Time in epoch (To store when it got added)
     */
    function addProduct(Types.Product memory product_, uint256 currentTime_)
        public
        onlyManufacturer
    {
        addAProduct(product_, currentTime_);
    }

    /**
     * @dev Transfer the ownership
     * @param partyId_ Purchase user's account address
     * @param barcodeId_ unique ID of the product
     * @param currentTime_ Current Date Time in epoch to keep track of the history
     */
    function sellProduct(
        address partyId_,
        string memory barcodeId_,
        uint256 currentTime_
    ) public {
        require(isPartyExists(partyId_), "Party not found");
        Types.UserDetails memory party_ = users[partyId_];
        sell(partyId_, barcodeId_, party_, currentTime_);
    }

    /**
     * @dev To add an user to my account, which can be used in future at the time of selling
     * @param user_ Details of the user that need to be added
     */
    function addParty(Types.UserDetails memory user_) public {
        addparty(user_, msg.sender);
    }

    /**
     * @dev To get details of the user
     * @param id_ User Id for whom the details were needed
     * @return user_ Details of the current logged-in User
     */
    function getUserDetails(address id_)
        public
        view
        returns (Types.UserDetails memory)
    {
        return getPartyDetails(id_);
    }

    /**
     * @dev To get details of the current logged-in user
     * @return user_ Details of the current logged-in User
     */
    function getMyDetails() public view returns (Types.UserDetails memory) {
        return getPartyDetails(msg.sender);
    }

    /**
     * @dev To get List of users that were added by the current logged-in user
     * @return usersList_ List of UserDetail objects will be returned (Which are added by same user)
     */
    function getMyUsersList()
        public
        view
        returns (Types.UserDetails[] memory usersList_)
    {
        return getMyPartyList(msg.sender);
    }
}
