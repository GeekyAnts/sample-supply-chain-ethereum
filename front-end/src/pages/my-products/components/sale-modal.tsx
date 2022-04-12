import {
  Avatar,
  Button,
  HStack,
  Modal,
  Select,
  Text,
  VStack,
} from "native-base";

import { ThemeButton } from "../../../components";
import { useApiCall } from "../../../hooks/hooks";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/reducers";
import { Product, UserDetails } from "../../../repository/interfaces";
import { epochToDate } from "../../../utils/epochToDate";
import { getNumberOfDays } from "../../../utils/daysLeft";
import { BsCheckCircle } from "react-icons/bs";
import { useNavigate } from "react-router";

export const SaleModal = ({
  showModal,
  setShowModal,
  productSelected,
}: {
  showModal: boolean;
  setShowModal: (arg0: boolean) => void;
  productSelected: Product;
}) => {
  const [selectedUser, setSelectedUser] = useState<string>();
  const { sellMyProduct, getUserList } = useApiCall();
  const { userDetails, addedUserList } = useSelector(
    (state: RootState) => state.generalReducer
  );
  const [userid, setUserId] = useState<string>("");
  const navigate = useNavigate();
  useEffect(() => {
    if (addedUserList.length === 0) {
      getUserList();
    }
  }, []);

  function sell() {
    console.log(userid, productSelected.barcodeId);
    sellMyProduct(userid, productSelected.barcodeId);

    setShowModal(false);
  }

  const selectUser = (text: string) => {
    let id: string = "";

    for (let i = 0; i < addedUserList.length; i++) {
      if (addedUserList[i].name === text) {
        id = addedUserList[i].id_;
      }
    }
    id.length !== 0 && setUserId(id);
  };

  return (
    <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
      <Modal.Content maxWidth="400px">
        <Modal.CloseButton />
        <Modal.Header>Sell Product</Modal.Header>
        <Modal.Body>
          <HStack mb={1} space={3} alignItems="center">
            <Avatar
              bg="purple.600"
              alignSelf="center"
              size="xl"
              source={{
                uri: productSelected.productImage,
              }}
            >
              RB
            </Avatar>
            <VStack maxWidth="70%">
              <Text
                color="coolGray.600"
                textTransform="uppercase"
                fontWeight="semibold"
                fontSize={[15, 18]}
                maxWidth="100%"
                wordBreak="break-all"
              >
                {productSelected.name}
              </Text>
              <Text
                fontSize={["10", "sm"]}
                fontWeight="light"
                textTransform="uppercase"
                color="coolGray.500"
              >
                {productSelected.barcodeId}
              </Text>
              <Text
                fontSize={["8", "xs"]}
                fontWeight="thin"
                textTransform="uppercase"
                color="coolGray.600"
              >
                mfg {epochToDate(productSelected.manDateEpoch)}
              </Text>
              <Text
                fontSize={["8", "xs"]}
                fontWeight="thin"
                textTransform="uppercase"
                color="coolGray.600"
              >
                expires in{" "}
                {getNumberOfDays(
                  productSelected.manDateEpoch,
                  productSelected.expDateEpoch
                )}{" "}
                days
              </Text>
            </VStack>
          </HStack>
          <VStack space={3}>
            <Select
              mt="2"
              w={["full", "full"]}
              accessibilityLabel="Click to see"
              placeholder="Click to see"
              _selectedItem={{
                bg: "teal.600",
                endIcon: <BsCheckCircle size={5} />,
              }}
              selectedValue={selectedUser}
              onValueChange={(text) => {
                text === "new-user" ? navigate("/add-user") : selectUser(text);
                setSelectedUser(text);
              }}
            >
              {addedUserList &&
                addedUserList.map((person) => (
                  <Select.Item
                    textTransform={"capitalize"}
                    label={person.name}
                    value={person.name}
                  />
                ))}
              <Select.Item label={"add new user"} value={"new-user"} />
            </Select>
            {/* <FormControl isInvalid={error.email}>
              <FormControl.Label>Buyers Email</FormControl.Label>
              <Input
                value={email}
                onChangeText={setEmail}
                InputLeftElement={
                  <MdAlternateEmail color="#d1d5db" size={25} />
                }
                fontSize={15}
              />
              <FormControl.ErrorMessage>
                invalid email id
              </FormControl.ErrorMessage>
            </FormControl> */}
            {/* <FormControl isDisabled mb="3">
              <FormControl.Label>Product Id</FormControl.Label>
              <Input
                value={productSelected.barcodeId}
                InputLeftElement={<FaUserAlt size={25} color="#d1d5db" />}
                fontSize={15}
              />
            </FormControl> */}
          </VStack>
        </Modal.Body>
        <Modal.Footer>
          <Button.Group space={2}>
            <Button
              variant="ghost"
              colorScheme="blueGray"
              // onPress={() => {
              //   cleanState();
              //   setError({
              //     email: false,
              //     name: false,
              //   });
              //   setShowModal(false);
              // }}
            >
              Cancel
            </Button>
            <ThemeButton handleOnPress={() => sell()} text="Sell" />
          </Button.Group>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};
