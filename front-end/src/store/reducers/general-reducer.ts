import { AnyAction } from "redux";
import { ACTION } from "../action-types";
import { StateType } from "../types";
import { UserDetails, UserRole } from "../../repository/interfaces";

const initialState: StateType = {
  isUserLoggedIn: false,
  isLoading: false,
  error: "",
  products: [],
  myProducts: [],
  userDetails: {} as UserDetails,
  addedUserList: [],
  searchedProducts: [],
};

export function generalReducer(
  state = initialState,
  action: AnyAction
): StateType {
  switch (action.type) {
    case ACTION.SET_LOGIN_STATUS: {
      const { status } = action.payload;
      let userGet;
      if (action.payload) {
        userGet = localStorage.getItem("LOGGEDIN_USER");
        if (userGet) {
          userGet = JSON.parse(userGet);
        }
      }
      let user: UserDetails = {
        email: userGet[3],
        name: userGet[2],
        id_: userGet[1],
        role: roleMap(userGet[0]),
      };
      return {
        ...state,
        isUserLoggedIn: status,
        userDetails: user ?? null,
      };
    }

    case ACTION.GET_ALL_PRODUCTS:
      return {
        ...state,
        products: action.payload,
      };

    case ACTION.SET_USER_DETAILS:
      let user: UserDetails = action.payload;
      localStorage.setItem("LOGGEDIN_USER", JSON.stringify(user));
      return {
        ...state,
        userDetails: action.payload,
      };

    case ACTION.SET_NEW_PRODUCT:
      const obj = action.payload;
      return {
        ...state,
        products: [...state.products, obj],
      };

    case ACTION.GET_MY_PRODUCTS:
      return {
        ...state,
        myProducts: action.payload,
      };

    case ACTION.GET_USERLIST:
      return {
        ...state,
        addedUserList: action.payload,
      };
      
    case ACTION.SET_SEARCHED_PRODUCTS:
      return {
        ...state,
        searchedProducts: action.payload,
      };

    case ACTION.RESET:
      return initialState;

    default:
      return state;
  }
}
export default generalReducer;

function roleMap(role: number): UserRole {
  switch (role) {
    case 0:
      return UserRole.Manufacturer;
    case 1:
      return UserRole.Supplier;
    case 2:
      return UserRole.Vendor;
    default:
      return UserRole.Customer;
  }
}
