import { FormControl } from "native-base";
import { FormDateType } from "./types";

export function FormDate({
  setFunction,
  placeholder,
  value: number,
}: FormDateType) {
  return (
    <FormControl mb="2">
      <FormControl.Label>{placeholder}</FormControl.Label>
      <input
        style={{ height: "2.1rem" }}
        type="date"
        name={placeholder}
        onChange={(e) => setFunction(e.target.value)}
      />
    </FormControl>
  );
}
