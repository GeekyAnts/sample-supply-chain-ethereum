import { Heading, Stack, VStack } from "native-base";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Layout } from "../../components";
import { useApiCall } from "../../hooks/hooks";
import { RootState } from "../../store/reducers";
import { ThreeCircles } from "react-loader-spinner";
import { AddUserForm, SearchBar, UsersData } from "./components";
import { SupplyChainService } from "../../repository/supplyChain";

export function AddUserPage() {
  const [searchText, setSearchText] = useState("");
  const { getUserList, userListLoading } = useApiCall();
  const { addedUserList } = useSelector(
    (state: RootState) => state.generalReducer
  );
  const [filteredList, setFilteredList] = useState(addedUserList);

  useEffect(() => {
    getUserList();
    listenToEvent();
  }, []);
  const listenToEvent = async () => {
    SupplyChainService.getInstance()
      .getContract()
      .on("newUser", async (name, email, role, event) => {
        getUserList();
      });
  };

  function handleSearch(text: string) {
    setSearchText(text);
    const query = text.toLowerCase();
    const data = addedUserList.filter(
      (user) =>
        user.email.toLowerCase().includes(query) ||
        user.name.toLowerCase().includes(query) ||
        user.id_.toLowerCase().includes(query)
    );
    setFilteredList(data);
  }

  return (
    <Layout>
      <VStack minW={["90vw", "80vw"]} alignItems="center">
        <Stack direction={{ sm: "column", lg: "row" }} w="100%" px="2" py="12">
          <VStack
            bg="white"
            borderRadius={"lg"}
            shadow={"1"}
            mr={["0", "8"]}
            mb={["8", "0"]}
            alignItems={"center"}
            w={["95vw", "50%"]}
          >
            <Heading my="10" size={"md"}>
              Existing Users
            </Heading>
            {userListLoading ? (
              <ThreeCircles
                color="blue"
                height={60}
                width={60}
                ariaLabel="three-circles-rotating"
              />
            ) : (
              <>
                {addedUserList.length !== 0 && (
                  <SearchBar
                    value={searchText}
                    handleOnChange={(text) => handleSearch(text)}
                  />
                )}
                <VStack
                  h="350"
                  mt="4"
                  mb="8"
                  w={["80vw", "30vw"]}
                  overflowY={
                    addedUserList && addedUserList.length <= 3
                      ? "hidden"
                      : "scroll"
                  }
                >
                  {searchText.length !== 0 ? (
                    <UsersData data={filteredList} />
                  ) : (
                    <UsersData data={addedUserList} />
                  )}
                </VStack>
              </>
            )}
          </VStack>
          <AddUserForm />
        </Stack>
      </VStack>
    </Layout>
  );
}
