// SPDX-License-Identifier: GPL-3.0
pragma experimental ABIEncoderV2;
pragma solidity >=0.4.25 <0.9.0;

/**
 * @title Types
 * @author Suresh Konakanchi
 * @dev All the custom types that we have used in Supply Chain
 */
library Types {
    enum UserRole {
        Manufacturer, // 0
        Supplier, // 1
        Vendor, // 2
        Customer // 3
    }

    struct UserDetails {
        UserRole role;
        address id_;
        string name;
        string email;
    }

    enum ProductType {
        BCG, // 0
        RNA, // 1
        MRNA, // 2
        MMR, // 3
        NasalFlu // 4
    }

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

    struct Product {
        string name;
        string manufacturerName;
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
}
