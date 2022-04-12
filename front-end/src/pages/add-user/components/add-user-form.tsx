import { Button, FormControl, Heading, Input, VStack } from "native-base";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useApiCall } from "../../../hooks/hooks";
import { RootState } from "../../../store/reducers";

export function AddUserForm() {
  const [newUserDetails, setNewUserDetails] = useState({
    name: "",
    email: "",
    id_: "",
  });
  const [error, setError] = useState({ name: false, email: false, id_: false });
  const { userDetails } = useSelector(
    (state: RootState) => state.generalReducer
  );
  const { loading, addUsers } = useApiCall();
  
  function validate() {
    if (!newUserDetails.email.includes("@")) {
      setError((curr) => ({ ...curr, email: true }));
      return false;
    } else if (newUserDetails.name.length < 3) {
      setError((curr) => ({ ...curr, name: true }));
      return false;
    } else if (userDetails.role !== 3 && newUserDetails.id_.length < 42) {
      setError((curr) => ({ ...curr, id_: true }));
      return false;
    }
    setError({ name: false, email: false, id_: false });
    return true;
  }

  async function handleAddUser() {
    try {
      if (validate()) {
        await addUsers({
          ...newUserDetails,
          role: userDetails.role + 1,
        });
        setNewUserDetails({
          name: "",
          email: "",
          id_: "",
        });
      }
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <VStack
      borderRadius={"lg"}
      shadow={"1"}
      bg="white"
      w={["95vw", "50%"]}
      alignItems={"center"}
      px="8"
      py="12"
    >
      <Heading size="md" mb="10">
        Add User Data
      </Heading>
      <FormControl mb="6" isInvalid={error.name}>
        <FormControl.Label>Name</FormControl.Label>
        <Input
          placeholder="john wick"
          value={newUserDetails.name}
          onChangeText={(value) =>
            setNewUserDetails((curr) => ({ ...curr, name: value }))
          }
        />
        <FormControl.ErrorMessage
          _text={{
            fontSize: "xs",
          }}
        >
          Invalid Name, It Should be more than 3 characters!
        </FormControl.ErrorMessage>
      </FormControl>
      <FormControl mb="6" isInvalid={error.email}>
        <FormControl.Label>Email</FormControl.Label>
        <Input
          placeholder="john@geekyants.com"
          value={newUserDetails.email}
          onChangeText={(value) =>
            setNewUserDetails((curr) => ({ ...curr, email: value }))
          }
        />

        <FormControl.ErrorMessage
          _text={{
            fontSize: "xs",
          }}
        >
          Invalid Email
        </FormControl.ErrorMessage>
      </FormControl>
      <FormControl mb="6" isInvalid={error.id_}>
        <FormControl.Label>Address</FormControl.Label>
        <Input
          placeholder="0x2D8706E94E187c4E1806a8F5b4c1e5xasdf460784D"
          value={newUserDetails.id_}
          onChangeText={(value) =>
            setNewUserDetails((curr) => ({ ...curr, id_: value }))
          }
        />

        <FormControl.ErrorMessage
          _text={{
            fontSize: "xs",
          }}
        >
          Invalid address, It Should be more than 3 characters!
        </FormControl.ErrorMessage>
      </FormControl>
      {loading ? (
        <Button
          alignSelf={"center"}
          minW="150"
          mt="4"
          bg="violet.700"
          isDisabled={true}
        >
          Adding...
        </Button>
      ) : (
        <Button
          alignSelf={"center"}
          minW="150"
          mt="4"
          bg="violet.700"
          _hover={{ bg: "violet.900" }}
          onPress={() => handleAddUser()}
        >
          Add
        </Button>
      )}
    </VStack>
  );
}
