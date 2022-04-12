import { HStack, VStack } from "native-base";
import { useEffect, useState } from "react";
import { ThreeCircles } from "react-loader-spinner";
import { Layout, ScreenHeader } from "../../components";
import { ProductDetail } from "./components/product-details";
import { VerticleTimeline } from "./components/verticla-timeline";
import { useLocation, useParams } from "react-router-dom";
import { useApiCall } from "../../hooks/hooks";
import { UserDetails, UserHistory } from "../../repository/interfaces";

export function ProductDetails() {
  const { productid } = useParams();
  const { state } = useLocation();
  const {
    getProductDetails,
    productData,
    productDetailsLoading,
    getIndividualDetails,
    getUserList,
  } = useApiCall();
  const [productHistory, setProductHistory] = useState<any>();

  useEffect(() => {
    if (productid) {
      getProductDetails(productid);
    }
  }, [productid]);

  function isEmpty(object: object) {
    for (const property in object) {
      return true;
    }
    return false;
  }
  function checkAddress(id: string) {
    return "0x0000000000000000000000000000000000000000" === id;
  }

  const customerParse = async (customerarr: UserHistory[]) => {
    const newObj = await Promise.all(customerarr.map(async (arr: UserHistory) => {
      const userData = await getIndividualDetails(arr.id_.toString());
      return {
        id_: arr.id_,
        date: arr.date,
        type: "customer",
        id: userData?.id_,
        name: userData?.name,
      };
    }));
    console.log(newObj, "customer");
    return newObj;
  };

  useEffect(() => {
    (async () => {
      const newHistoryArray = [];
      if (productData?.productHistory) {
        console.log(productData?.productHistory, "productData?.productHistory");
        for (const property in productData?.productHistory) {
          if (
            property === "manufacturer" &&
            isEmpty(productData.productHistory.manufacturer)
          ) {
            getUserList();
            const userData = await getIndividualDetails(
              productData.productHistory.manufacturer.id_.toString()
            );
            console.log(userData, "manufacturer");
            if (userData) {
              const details = {
                ...productData.productHistory.manufacturer,
                type: "manufacturer",
                email: userData?.email,
                id: userData?.id_,
                name: userData?.name,
              };
              newHistoryArray.push(details);
            }
          } else if (
            property === "customers" &&
            isEmpty(productData.productHistory.customers)
          ) {
            const result = await customerParse(
              productData.productHistory.customers
            );
            newHistoryArray.push(...result);
          } else if (
            property === "supplier" &&
            isEmpty(productData.productHistory.supplier) &&
            !checkAddress(productData.productHistory.supplier.id_.toString())
          ) {
            const userData = await getIndividualDetails(
              productData.productHistory.supplier.id_.toString()
            );
            console.log(userData, "supplier");
            if (userData) {
              const details = {
                ...productData.productHistory.supplier,
                type: "supplier",
                email: userData?.email,
                id: userData?.id_,
                name: userData?.name,
              };
              newHistoryArray.push(details);
            }
          } else if (
            property === "vendor" &&
            isEmpty(productData.productHistory.vendor) &&
            !checkAddress(productData.productHistory.vendor.id_.toString())
          ) {
            const userData = await getIndividualDetails(
              productData.productHistory.vendor.id_.toString()
            );
            console.log(userData, "vendor");
            if (userData) {
              const details = {
                ...productData.productHistory.vendor,
                type: "vendor",
                email: userData?.email,
                id: userData?.id_,
                name: userData?.name,
              };
              newHistoryArray.push(details);
            }
          }
        }
      }
      console.log(newHistoryArray);
      setProductHistory(newHistoryArray);
    })();
  }, [productData]);

  return (
    <Layout>
      <VStack>
        <ScreenHeader route={state ? state : "/"} text="Product Details" />
        <VStack
          minH="60vh"
          minW={["90vw", "50vw"]}
          bg="white"
          borderRadius={"md"}
        >
          <VStack p={["4", "10"]}>
            {productData && <ProductDetail data={productData} />}

            {productData && (
              <VerticleTimeline productHistory={productHistory} />
            )}
          </VStack>
          {productDetailsLoading && (
            <HStack justifyContent={"center"}>
              <ThreeCircles
                color="blue"
                height={110}
                width={110}
                ariaLabel="three-circles-rotating"
              />
            </HStack>
          )}
        </VStack>
      </VStack>
    </Layout>
  );
}
