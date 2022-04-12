import { Box, HStack, Image, Text, VStack } from "native-base";
import { Barcode } from "../../../components/barcode";
import validator from "validator";
import { Product } from "../../../repository/interfaces";
import { getNumberOfDays } from "../../../utils/daysLeft";
import { epochToDate } from "../../../utils/epochToDate";
import { GenerelInformation } from "./general-information";

export const ProductDetail = ({ data }: { data: Product }) => {
  return (
    <Box position="relative">
      <HStack space={[3, 5]}>
        <HStack justifyContent={"center"}>
          <Image
            key={data?.barcodeId}
            borderRadius={"md"}
            size={["md", "xl"]}
            resizeMode="cover"
            fallbackSource={{
              uri: "https://api.time.com/wp-content/uploads/2020/11/pfizer-vaccine-1.jpg?w,1600,quality,70",
            }}
            source={{
              uri: data?.productImage,
            }}
            alt={data.scientificName}
          />
        </HStack>
        <VStack maxWidth={["40%"]}>
          <Text
            color="coolGray.600"
            textTransform="uppercase"
            fontWeight="semibold"
            fontSize={["md", "2xl"]}>
            {data?.name}
          </Text>
          <Text
            fontSize={["sm", "lg"]}
            fontWeight="thin"
            textTransform="uppercase"
            color="coolGray.500">
            {data?.barcodeId}
          </Text>
          <Text
            fontSize={["12", "sm"]}
            fontWeight="light"
            textTransform="uppercase"
            color="coolGray.400">
            mfg {epochToDate(Number(data.manDateEpoch.toString()))}
          </Text>
          <Text
            fontSize={["12", "sm"]}
            fontWeight="light"
            textTransform="uppercase"
            color="coolGray.400">
            Expires in{" "}
            {getNumberOfDays(
              Number(data?.manDateEpoch),
              Number(data?.expDateEpoch)
            )}{" "}
            days
          </Text>
        </VStack>
      </HStack>
      <VStack mt={2} space={1}>
        <Text
          color="coolGray.600"
          textTransform="uppercase"
          fontWeight="semibold"
          fontSize={["md", "lg"]}>
          General Information
        </Text>
        <GenerelInformation heading="type">bcg</GenerelInformation>
        <GenerelInformation heading="Scientific Name">
          Paracetamol
        </GenerelInformation>
        <GenerelInformation heading="Ingredients">
          <Box>
            {data &&
              data.composition.length !== 0 &&
              data.composition.map((item: string) => (
                <Text
                  fontSize={["12", "sm"]}
                  fontWeight="light"
                  textTransform="uppercase"
                  color="coolGray.400">
                  <span style={{ fontSize: "22px" }}>&bull;</span> {item}
                </Text>
              ))}
          </Box>
        </GenerelInformation>
        <GenerelInformation heading="Side Effects">
          {data &&
            data.sideEffects.length !== 0 &&
            data.sideEffects.map(
              (item: string, index, arr) =>
                `${item}${index !== arr.length - 1 && ", "}`
            )}
        </GenerelInformation>

        <GenerelInformation heading="Usage">
          {data && data.usage}
        </GenerelInformation>
      </VStack>
      {data?.isInBatch && (
        <VStack position="absolute" right={5}>
          <Text
            textTransform="capitalize"
            fontSize={["sm", "20"]}
            color="coolGray.600"
            fontWeight="semibold">
            Batch Count
          </Text>
          <Text textAlign={"center"} fontSize={["xl", "4xl"]} fontWeight="bold">
            {data?.batchCount.toString()}
          </Text>
        </VStack>
      )}
      <Box position="absolute" right={5} top={"45%"}>
        <Barcode data={data?.barcodeId} />
      </Box>
    </Box>
  );
};
