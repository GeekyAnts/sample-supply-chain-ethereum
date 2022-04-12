import { IInputProps } from "native-base";

export type FormInputType = {
  type: string;
  setFunction: Function;
  placeholder: string;
  errorMessage?: string;
  helperText?: string;
  errorValue?: boolean;
  value: string;
} & IInputProps;

export type FormDateType = {
  setFunction: Function;
  placeholder: string;
  value: string;
};
