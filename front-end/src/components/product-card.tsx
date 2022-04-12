import { Box, HStack, Image, Pressable, Text, VStack } from "native-base";

import { useLocation, useNavigate } from "react-router-dom";

import { Product } from "../repository/interfaces";
import { getNumberOfDays } from "../utils/daysLeft";
import { epochToDate } from "../utils/epochToDate";
import validator from "validator";
import { Barcode } from "./barcode";

import { ThemeButton } from "./theme-button";

export const ProductCard = ({
  item,
  setShowModal,
  setProductSelected,
}: {
  item: Product;
  setShowModal?: (arg0: boolean) => void;
  setProductSelected?: (args0: Product) => void;
}) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <Pressable
      m="4"
      mx={["auto", 4]}
      cursor={"initial"}
      _hover={{ shadow: "1" }}
      borderRadius="14px">
      <HStack
        alignItems={"center"}
        space={[3, 6]}
        padding={["4", "3"]}
        borderRadius="14px"
        bgColor="white">
        <HStack
          justifyContent={"center"}
          alignItems="center"
          width={["25vw", "8vw"]}
          height={["5vh", "15vh"]}>
          <Image
            borderRadius="14px"
            source={{
              uri: item.productImage,
            }}
            fallbackSource={{
              uri: "https://api.time.com/wp-content/uploads/2020/11/pfizer-vaccine-1.jpg?w,1600,quality,70",
            }}
            alt={item.scientificName}
            size={["md", "xl"]}
          />
        </HStack>

        <VStack space={1} width={["15vh"]} alignSelf="flex-start">
          <Text
            color="coolGray.600"
            textTransform="uppercase"
            fontWeight="semibold"
            fontSize={["md"]}
            textOverflow="ellipsis"
            whiteSpace={"nowrap"}
            overflow="hidden">
            {item.name}
          </Text>
          <Text
            fontSize={["10", "sm"]}
            fontWeight="light"
            textTransform="uppercase"
            color="coolGray.500">
            {item.barcodeId}
          </Text>
          <Text
            fontSize={["8", "xs"]}
            fontWeight="thin"
            textTransform="uppercase"
            color="coolGray.600">
            mfg {epochToDate(item.manDateEpoch)}
          </Text>
          <Text
            fontSize={["8", "xs"]}
            fontWeight="thin"
            textTransform="uppercase"
            color="coolGray.600">
            expires in {getNumberOfDays(item.manDateEpoch, item.expDateEpoch)}{" "}
            days
          </Text>
        </VStack>
        <VStack space={3}>
          <ThemeButton
            mb={["2", "0"]}
            ml="2"
            handleOnPress={() =>
              navigate(`/product/${item.barcodeId}`, { state: pathname })
            }
            text={"View Details"}
            width={["6rem"]}
          />

          {pathname === "/my-products" && setShowModal && (
            <ThemeButton
              ml="2"
              handleOnPress={() => {
                setShowModal(true);
                setProductSelected && setProductSelected(item);
              }}
              width="6rem"
              text={" Sell"}
            />
          )}
          {pathname === "/all-products" && (
            <Box ml={3}>
              <Barcode data={item.barcodeId} />
            </Box>
          )}
        </VStack>
      </HStack>
    </Pressable>
  );
};
