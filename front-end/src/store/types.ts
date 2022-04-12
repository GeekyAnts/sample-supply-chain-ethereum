import { Product, UserDetails } from "../repository/interfaces";

export type StateType = {
  isUserLoggedIn: boolean;
  isLoading: boolean;
  error: string;
  products: Product[];
  myProducts: Product[];
  userDetails: UserDetails;
  addedUserList: UserDetails[];
  searchedProducts: Product[];
};

// export type ActionType = {
//   type: string;
//   payload: any;
// };

// export type ACTIONTYPE =
//   | {
//       type: "SET_LOGIN_STATUS";
//       payload: {
//         status: boolean;
//         userType: UserType;
//       };
//     }
//   | { type: "RESET" }
//   | {
//       type: "GET_ALL_PRODUCTS";
//       payload: Product[];
//     }
//   | {
//       type: "SET_USER_DETAILS";
//       payload: UserProperties;
//     };
