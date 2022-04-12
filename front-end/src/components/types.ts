import { IButtonProps } from "native-base";

export type MinButtonProps = {
  text: string;
  handleOnPress: () => void;
};

export type ButtonProps = MinButtonProps & IButtonProps;
