// export type FormProductDetails = {
//   name: string;
//   manufactureDate: string;
//   expiryDate: string;
//   id: string;
//   notes: string;
//   image: string;
//   batch?: number;
//   manufacturerName: string;
//   manufacturerEmail: string;
//   imgUrl: string;
//   type: string;
// };

export interface Productkkkkkkk {
  // manufacturer: UserDetails;
  // supplier: UserDetails;
  // vendor: UserDetails;
  // customer: UserDetails;
  name: string;
  isInBatch: boolean;
  batchCount: number;
  expDateEpoch: number;
  manDateEpoch: number;
  productId: string;
}

// export interface UserDetails {
//   role: UserRole;
//   user_Id: string; // metamask address
//   name: string;
//   email: string;
//   user_type: string; //types
//   epochTime: number; // This will always have UTC epoch time
// }
// enum UserRole {
//   Manufacturer,
//   Supplier,
//   Vendor,
//   Customer,
// }

// export interface ProductObject {
//   name: string;
//   isInBatch: boolean;
//   batchCount: number;
//   expDateEpoch: string;
//   manDateEpoch: string;
//   productId: string;
//   ingredients: string[];
//   side_effects: string[];
//   scientific_name: string;
//   image: string;
//   notes: string;
//   type?: string;
// }
