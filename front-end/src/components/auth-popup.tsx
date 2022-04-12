import { Box, Button, Text, VStack } from "native-base";
import { useNavigate } from "react-router-dom";
import { ThemeButton } from "./theme-button";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/reducers";
import { resetStates } from "../store/actions";
import { useApiCall } from "../hooks/hooks";
import { UserRole } from "../repository/interfaces";

export const AuthPopup = ({ setShowBox }: { setShowBox: any }) => {
  const navigate = useNavigate();
  const { isUserLoggedIn, userDetails } = useSelector(
    (state: RootState) => state.generalReducer
  );
  const dispatch = useDispatch();
  const { getUserDetails } = useApiCall();

  return (
    <Box
      zIndex={2}
      position="fixed"
      right={{ base: "3", md: 5 }}
      top={[12, 24]}
      shadow={3}
      borderRadius="md"
      borderColor="gray.300"
      bg="white"
      width="270px">
      <VStack space={1} padding={4}>
        {!isUserLoggedIn ? (
          <ThemeButton
            handleOnPress={() => {
              getUserDetails();
            }}
            text="Login"
          />
        ) : (
          <>
            <Text fontSize={"lg"} fontWeight="semibold">
              {userDetails?.name}
            </Text>
            <Text fontSize={"lg"} fontWeight="semibold">
              {userDetails?.email}
            </Text>{" "}
            {userDetails.role !== UserRole.Customer && (
              <ThemeButton
                handleOnPress={() => navigate("/add-user")}
                text={"View Users"}
              />
            )}
            <ThemeButton
              handleOnPress={() => {
                dispatch(resetStates());
                navigate("/");
                window.localStorage.clear();

                return setShowBox(false);
              }}
              text="Logout"
            />
          </>
        )}
      </VStack>
    </Box>
  );
};
