import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { Product, UserDetails } from "../repository/interfaces";
import { SupplyChainService } from "../repository/supplyChain";
import {
  setAllProducts,
  setUserDetails,
  setNewProduct,
  getUsersList,
  setMyProducts,
} from "../store/actions";
import { toastError, toastSuccess } from "../utils/toastMessages";

export const useApiCall = () => {
  const apiInstance = SupplyChainService.getInstance();
  const dispatch = useDispatch();
  const [productData, setProductData] = useState<Product>();
  const [loading, setLoading] = useState(false);
  const [productListLoading, setProductListLoading] = useState(false);
  const [myProductListLoading, setMyProductListLoading] = useState(false);
  const [productDetailsLoading, setProductDetailsLoading] = useState(false);
  const [userListLoading, setUserListLoading] = useState(false);

  const getUserList = useCallback(async () => {
    try {
      setUserListLoading(true);
      const users = await apiInstance.getMyUsersList();
      dispatch(getUsersList(users));
    } catch (error) {
      console.log(error);
      toastError("Failed to get user");
    } finally {
      setUserListLoading(false);
    }
  }, []);

  const getMyProducts = useCallback(async () => {
    try {
      setMyProductListLoading(true);
      const listData = await apiInstance.getMyProducts();
      dispatch(setMyProducts(listData));
    } catch (error) {
      console.log(error);
      toastError("Failed to get my products");
    } finally {
      setMyProductListLoading(false);
    }
  }, []);

  const getProducts = useCallback(async () => {
    try {
      setProductListLoading(true);
      const listData: Product[] = await apiInstance.getAllProducts();

      dispatch(setAllProducts(listData));
    } catch (error) {
      console.log(error);
      toastError("Could not retrive product list");
    } finally {
      setProductListLoading(false);
    }
  }, []);

  const getProductDetails = useCallback(async (productId: string) => {
    try {
      setProductDetailsLoading(true);
      const productData: Product = await apiInstance.getSingleProducts(
        productId
      );
      setProductData(productData);
    } catch (error) {
      console.log(error);
      toastError("Failed to retrive Product details");
    } finally {
      setProductDetailsLoading(false);
    }
  }, []);

  const getUserDetails = useCallback(async () => {
    try {
      const userDetails: UserDetails = await apiInstance.getMyDetails();
      dispatch(setUserDetails(userDetails));
    } catch (error) {
      toastError("Couldnt retrive user details");
    }
  }, [dispatch]);

  const getIndividualDetails = useCallback(async (id) => {
    try {
      const userDetails: UserDetails = await apiInstance.getUserDetail(id);
      return userDetails;
    } catch (error) {
      toastError("Couldnt retrive user details");
    }
  }, []);

  const sellMyProduct = useCallback(
    async (partyAddress: string, productId: string) => {
      try {
        const sellerDetails: boolean = await apiInstance.sellProduct(
          partyAddress,
          productId
        );
        if (sellerDetails) {
          toastSuccess("Product successfully sold");
        }
      } catch (error) {
        toastError("Something went wrong");
      }
    },
    []
  );

  const addMyProduct = useCallback(async (product: Product) => {
    try {
      const productAdded = await apiInstance.addProduct(product);
      if (productAdded) {
        dispatch(setNewProduct(product));
        toastSuccess("Transaction to add new product has been initiated.");
        return true;
      }
    } catch (error) {
      toastError("Failed to add product");
    }
  }, []);

  const addUsers = useCallback(async (user: UserDetails) => {
    try {
      setLoading(true);
      const userAdded = await apiInstance.addParty(user);
      console.log(userAdded);
      toastSuccess("user added successfully");
    } catch (error) {
      toastError("Failed to add user");
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    getProducts,
    getProductDetails,
    productData,
    setProductData,
    getUserDetails,
    sellMyProduct,
    addMyProduct,
    addUsers,
    getUserList,
    getMyProducts,
    getIndividualDetails,
    loading,
    userListLoading,
    productListLoading,
    myProductListLoading,
    productDetailsLoading,
  };
};
