import { Product, UserDetails } from "../../repository/interfaces";
import { ACTION } from "../action-types";

export function setLoginStatus(payload: {
  status: boolean;
  // userType: UserType;
}) {
  return {
    type: ACTION.SET_LOGIN_STATUS,
    payload,
  };
}

export function resetStates() {
  return {
    type: ACTION.RESET,
  };
}

export const setAllProducts = (payload: Product[]) => {
  return {
    type: ACTION.GET_ALL_PRODUCTS,
    payload,
  };
};

export const setMyProducts = (payload: Product[]) => {
  return {
    type: ACTION.GET_MY_PRODUCTS,
    payload,
  };
};

export const setUserDetails = (payload: UserDetails) => {
  return {
    type: ACTION.SET_USER_DETAILS,
    payload,
  };
};

export const setNewProduct = (payload: Product) => {
  return {
    type: ACTION.SET_NEW_PRODUCT,
    payload,
  };
};

export const getUsersList = (payload: UserDetails[]) => {
  return {
    type: ACTION.GET_USERLIST,
    payload,
  };
};

export const setSearchedProducts = (payload: Product[]) => {
  return {
    type: ACTION.SET_SEARCHED_PRODUCTS,
    payload,
  };
};
