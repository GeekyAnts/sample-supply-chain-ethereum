import { Text } from "native-base";
import React from "react";
export const MainText = ({ children }: { children: React.ReactNode }) => {
  return (
    <Text
      textAlign="center"
      color="white"
      letterSpacing={2}
      fontSize={{ base: "xl", md: "6xl" }}
      display="block">
      {children}
    </Text>
  );
};
