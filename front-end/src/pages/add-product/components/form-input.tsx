import { FormControl, Input } from "native-base";
import { FormInputType } from "./types";

export function FormInput(props: FormInputType) {
  const {
    type,
    setFunction,
    placeholder,
    helperText,
    errorValue,
    errorMessage,
    value,
    ...rest
  } = props;
  return (
    <FormControl isInvalid={errorValue} mb="2">
      <FormControl.Label>{placeholder}</FormControl.Label>
      <Input
        {...rest}
        value={value || ""}
        type={type}
        onChangeText={(value) => setFunction(value)}
      />

      {helperText && (
        <FormControl.HelperText
          _text={{
            fontSize: "xs",
          }}>
          {helperText}
        </FormControl.HelperText>
      )}
    </FormControl>
  );
}
