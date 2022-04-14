// SPDX-License-Identifier: GPL-3.0
pragma experimental ABIEncoderV2;
pragma solidity >=0.4.25 <0.9.0;

import "./Types.sol";

/**
 * @title Users
 * @author Suresh Konakanchi | GeekyAnts
 * @dev Library for managing addresses assigned to a particular user with a particular role.
 */
contract Users {
    mapping(address => Types.UserDetails) internal users;
    mapping(address => Types.UserDetails[]) internal manufacturerSuppliersList;
    mapping(address => Types.UserDetails[]) internal supplierVendorsList;
    mapping(address => Types.UserDetails[]) internal vendorCustomersList;

    event NewUser(string name, string email, Types.UserRole role);
    event LostUser(string name, string email, Types.UserRole role);

    /**
     * @dev To add a particular user to a particular role
     * @param user UserDetails that need to be added
     */
    function add(Types.UserDetails memory user) internal {
        require(user.id_ != address(0));
        require(!has(user.role, user.id_), "Same user with same role exists");
        users[user.id_] = user;
        emit NewUser(user.name, user.email, user.role);
    }

    /**
     * @dev To add a particular user to a current logged-in user's correspondence list
     * @param user UserDetails that need to be added
     * @param myAccount User address who is trying to add the other user
     */
    function addparty(Types.UserDetails memory user, address myAccount)
        internal
    {
        require(myAccount != address(0));
        require(user.id_ != address(0));

        if (
            get(myAccount).role == Types.UserRole.Manufacturer &&
            user.role == Types.UserRole.Supplier
        ) {
            // Only manufacturers are allowed to add suppliers
            manufacturerSuppliersList[myAccount].push(user);
            add(user); // To add user to global list
        } else if (
            get(myAccount).role == Types.UserRole.Supplier &&
            user.role == Types.UserRole.Vendor
        ) {
            // Only suppliers are allowed to add vendors
            supplierVendorsList[myAccount].push(user);
            add(user); // To add user to global list
        } else if (
            get(myAccount).role == Types.UserRole.Vendor &&
            user.role == Types.UserRole.Customer
        ) {
            // Only vendors are allowed to add customers
            vendorCustomersList[myAccount].push(user);
            add(user); // To add user to global list
        } else {
            revert("Not valid operation");
        }
    }

    /**
     * @dev To get List of users that were added by the current logged-in user
     * @param id_ User address who is trying to get his/her party details list
     * @return usersList_ List of UserDetail objects will be returned (Which are added by same user)
     */
    function getMyPartyList(address id_)
        internal
        view
        returns (Types.UserDetails[] memory usersList_)
    {
        require(id_ != address(0), "Id is empty");
        if (get(id_).role == Types.UserRole.Manufacturer) {
            usersList_ = manufacturerSuppliersList[id_];
        } else if (get(id_).role == Types.UserRole.Supplier) {
            usersList_ = supplierVendorsList[id_];
        } else if (get(id_).role == Types.UserRole.Vendor) {
            usersList_ = vendorCustomersList[id_];
        } else {
            // Customer flow is not supported yet
            revert("Not valid operation");
        }
    }

    /**
     * @dev To get details of the user
     * @param id_ User Id for whom the details were needed
     * @return user_ Details of the current logged-in User
     */
    function getPartyDetails(address id_)
        internal
        view
        returns (Types.UserDetails memory)
    {
        require(id_ != address(0));
        require(get(id_).id_ != address(0));
        return get(id_);
    }

    /**
     * @dev To get user details based on the address
     * @param account User address that need to be linked to user details
     * @return user_ Details of a registered user
     */
    function get(address account)
        internal
        view
        returns (Types.UserDetails memory)
    {
        require(account != address(0));
        return users[account];
    }

    /**
     * @dev To remove a particular user from a particular role
     * @param role User role for which he/she has to be dismissed for
     * @param account User Address that need to be removed
     */
    function remove(Types.UserRole role, address account) internal {
        require(account != address(0));
        require(has(role, account));
        string memory name_ = users[account].name;
        string memory email_ = users[account].email;
        delete users[account];
        emit LostUser(name_, email_, role);
    }

    // Internal Functions

    /**
     * @dev To check if the party/user exists or not
     * @param account Address of the user/party to be verified
     */
    function isPartyExists(address account) internal view returns (bool) {
        bool existing_;
        if (account == address(0)) return existing_;
        if (users[account].id_ != address(0)) existing_ = true;
        return existing_;
    }

    /**
     * @dev check if an account has this role
     * @param role UserRole that need to be checked
     * @param account Account address that need to be verified
     * @return bool whether the same user with same role exists or not
     */
    function has(Types.UserRole role, address account)
        internal
        view
        returns (bool)
    {
        require(account != address(0));
        return (users[account].id_ != address(0) &&
            users[account].role == role);
    }

    // Modifiers

    /**
     * @notice To check if the party is manufacturer
     */
    modifier onlyManufacturer() {
        require(msg.sender != address(0), "Sender's address is Empty");
        require(users[msg.sender].id_ != address(0), "User's address is Empty");
        require(
            Types.UserRole(users[msg.sender].role) ==
                Types.UserRole.Manufacturer,
            "Only manufacturer can add"
        );
        _;
    }
}
