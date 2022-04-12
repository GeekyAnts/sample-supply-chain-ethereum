import { Input } from "native-base";
import { useEffect, useState } from "react";
import { BsSearch } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router";
import { Product } from "../repository/interfaces";
import { setSearchedProducts } from "../store/actions";
import { RootState } from "../store/reducers";

export function SearchList({ showIcon }: { showIcon: boolean }) {
  const [isInputVisible, setInputVisible] = useState(false);
  const [userInput, setUserInput] = useState("");
  const { products, myProducts } = useSelector(
    (state: RootState) => state.generalReducer
  );
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  function findProduct(productList: Product[], data: string) {
    if (productList) {
      const searchedProducts = productList.filter(
        ({ name, barcodeId }) =>
          barcodeId?.toLowerCase().includes(data.toLowerCase()) ||
          name?.toLowerCase().includes(data.toLowerCase())
      );
      if (searchedProducts) {
        dispatch(setSearchedProducts(searchedProducts));
      }
    }
  }

  useEffect(() => {
    if (!isInputVisible) {
      setUserInput("");
    }
  }, [isInputVisible]);

  function handleSearchInput(text: string) {
    setUserInput(text);
    if (text === "") {
      return dispatch(
        setSearchedProducts(pathname === "/my-products" ? myProducts : products)
      );
    }
    return findProduct(
      pathname === "/my-products" ? myProducts : products,
      userInput
    );
  }

  if (pathname === "/") {
    return <></>;
  }

  return (
    <>
      {showIcon && isInputVisible && (
        <Input
          value={userInput}
          placeholder="Search Products"
          onChangeText={(text) => handleSearchInput(text)}
          w={["40", "250"]}
          mr={["2", "5"]}
        />
      )}
      {showIcon && (
        <BsSearch
          onClick={() => setInputVisible((curr) => !curr)}
          size={35}
          className="theme-color"
          cursor="pointer"
        />
      )}
    </>
  );
}
