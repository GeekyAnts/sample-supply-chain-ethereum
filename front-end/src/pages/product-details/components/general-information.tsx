import { HStack, Text } from "native-base";
import React from "react";

export const GenerelInformation = ({
  heading,
  children,
}: {
  heading: string;
  children: React.ReactNode;
}) => {
  return (
    <HStack space={2} flexDirection={["column", "row"]}>
      <Text
        fontSize={["12", "sm"]}
        fontWeight="semibold"
        width={"150px"}
        textTransform="uppercase"
        color="coolGray.500"
      >
        {heading} :
      </Text>
      <Text
        fontSize={["12", "sm"]}
        fontWeight="light"
        textTransform="uppercase"
        width={["90%", "400px"]}
        color="coolGray.400"
      >
        {children}
      </Text>
    </HStack>
  );
};
