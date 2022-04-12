import { HStack, Input, Text } from "native-base";

export function List({
  id,
  value,
  setFunction,
}: {
  id: string;
  value: string;
  setFunction: Function;
}) {
  return (
    <HStack>
      <Text mr="4" fontSize="lg" bold>
        {id}.
      </Text>
      <Input
        w="100%"
        type="text"
        onChangeText={(text) => setFunction(text)}
        mb="2"
        value={value}
      />
    </HStack>
  );
}
