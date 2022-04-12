import { Avatar, Box, Button, HStack, Text, VStack } from "native-base";

import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { UserRole } from "../repository/interfaces";
import { resetStates } from "../store/actions";
import { RootState } from "../store/reducers";
import { Links } from "./links";
import { ThemeButton } from "./theme-button";

export function MobileNav() {
  const { isUserLoggedIn, userDetails } = useSelector(
    (state: RootState) => state.generalReducer
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <Box
      position={"fixed"}
      top="0"
      left="0"
      h="100vh"
      w="100vw"
      bg="white"
      zIndex={"100"}
      display="flex"
      justifyContent="center"
    >
      <HStack justifyContent={"center"} mb="5">
        <Avatar
          size={"lg"}
          bg="green.500"
          mr={isUserLoggedIn ? "2" : "0"}
          source={{
            uri: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
          }}
        ></Avatar>

        {isUserLoggedIn && (
          <VStack space={1}>
            <Text fontSize={"lg"} color="coolGray.400" fontWeight="semibold">
              {userDetails?.name}
            </Text>
            <Text fontSize={"lg"} color="coolGray.400" fontWeight="semibold">
              {userDetails?.email}
            </Text>{" "}
          </VStack>
        )}
      </HStack>
      <VStack justifyContent={"center"} alignItems="center">
        <Links />
        {isUserLoggedIn && userDetails.role !== UserRole.Customer && (
          <NavLink
            style={{ marginTop: "1rem" }}
            className={(navData) => (navData.isActive ? "link-active" : "link")}
            to="/my-products"
          >
            <Text fontWeight={"semibold"} fontSize="lg">
              My Products
            </Text>
          </NavLink>
        )}
        {isUserLoggedIn && userDetails.role === UserRole.Manufacturer && (
          <NavLink
            style={{ marginTop: "1rem" }}
            className={(navData) => (navData.isActive ? "link-active" : "link")}
            to="/add-product"
          >
            <Text fontWeight={"semibold"} fontSize="lg">
              Add Products
            </Text>
          </NavLink>
        )}
        {!isUserLoggedIn ? (
          <ThemeButton
            mt="4"
            handleOnPress={() => navigate("/login")}
            text="Login"
          />
        ) : (
          <Button
            mt={"4"}
            backgroundColor="red.500"
            _hover={{ bgColor: "red.900" }}
            onPress={() => {
              dispatch(resetStates());
              navigate("/");
            }}
          >
            Logout
          </Button>
        )}
      </VStack>
    </Box>
  );
}
