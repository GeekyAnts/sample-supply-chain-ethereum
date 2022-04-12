import { HStack, Input } from "native-base";
import { BsSearch } from "react-icons/bs";
import { IoIosCloseCircleOutline } from "react-icons/io";

export function SearchBar({
  value,
  handleOnChange,
}: {
  value: string;
  handleOnChange: (text: string) => void;
}) {
  return (
    <HStack>
      <Input
        placeholder="Search users"
        width={["80vw", "25vw"]}
        borderRadius="4"
        p="3"
        InputLeftElement={<BsSearch style={{ marginLeft: "1rem" }} />}
        value={value}
        onChangeText={(text) => handleOnChange(text)}
        InputRightElement={
          value.length > 1 ? (
            <IoIosCloseCircleOutline
              style={{ marginRight: "1rem", cursor: "pointer" }}
              size="20"
              onClick={() => handleOnChange("")}
            />
          ) : (
            <></>
          )
        }
      />
    </HStack>
  );
}
