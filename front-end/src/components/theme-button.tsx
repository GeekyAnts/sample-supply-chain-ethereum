import { Button } from "native-base";
import React from "react";
import { ButtonProps } from "./types";

export const ThemeButton = (props: ButtonProps) => {
  const { text, handleOnPress, ...rest } = props;
  return (
    <Button
      {...rest}
      bg="#0000c9"
      _pressed={{ bg: "violet.900" }}
      _hover={{ bg: "violet.900" }}
      onPress={handleOnPress}>
      {text}
    </Button>
  );
};
