import { Box, Button, IconButton, Tooltip } from "native-base";
import { useState } from "react";
import { BsFillCartPlusFill, BsPlusLg } from "react-icons/bs";
import { VscChromeClose } from "react-icons/vsc";

import { FaUserPlus } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { RootState } from "../store/reducers";
import { Product, UserRole } from "../repository/interfaces";
// import { SupplyChainService } from "../repository/supplyChain";

export default function Fab() {
  const [isOpen, setOpen] = useState(false);
  let navigate = useNavigate();
  const { userDetails } = useSelector(
    (state: RootState) => state.generalReducer
  );
  // const apiInstance = SupplyChainService.getInstance();

  if (userDetails.role === UserRole.Customer) return null;
  return (
    <>
      <Box position={"fixed"} right={["16"]} bottom={["95", "165"]}>
        <Box display={isOpen ? "block" : "none"}>
          <Tooltip
            bg="violet.600"
            _text={{
              color: "#fff",
            }}
            label="Add User"
            placement={"left"}
          >
            <IconButton
              mb="4"
              onPress={() => navigate("/add-user")}
              variant="solid"
              borderRadius="full"
              color="white"
              p={["2", "4"]}
              bg="#0000c9"
              fontSize={["17", "34"]}
              _hover={{ bg: "#0000c9" }}
              _pressed={{ bg: "#0000c9" }}
              icon={<FaUserPlus />}
            />
          </Tooltip>
          {userDetails.role === UserRole.Manufacturer && (
            <Tooltip
              bg="violet.600"
              _text={{
                color: "#fff",
              }}
              label="Add Product"
              placement={"left"}
            >
              <IconButton
                onPress={() => navigate("/add-product")}
                mb="4"
                variant="solid"
                bg="#0000c9"
                borderRadius="full"
                _hover={{ bg: "#0000c9" }}
                _pressed={{ bg: "#0000c9" }}
                color="white"
                p={["2", "4"]}
                fontSize={["17", "34"]}
                icon={<BsFillCartPlusFill />}
              />
            </Tooltip>
          )}
        </Box>
      </Box>
      <Button
        shadow={4}
        p={["2", "6"]}
        position={"fixed"}
        right="16"
        bottom="30"
        mb="16"
        fontSize={["18", "18"]}
        variant="solid"
        borderRadius="full"
        onPress={async () => {
          setOpen((curr) => !curr);
          // await apiInstance.addProduct(null as unknown as Product);
        }}
        bg="#0000c9"
        _hover={{ bg: "#0000c9" }}
        _pressed={{ bg: "#0000c9" }}
        color="white"
      >
        {isOpen ? <VscChromeClose /> : <BsPlusLg />}
      </Button>
    </>
  );
}
