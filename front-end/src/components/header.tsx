import { Avatar, Box, HStack, Image, Pressable } from "native-base";
import { useState } from "react";

import { BsCartFill, BsCartPlusFill, BsFillBagFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { RootState } from "../store/reducers";
import { useSelector } from "react-redux";
import { AuthPopup } from "./auth-popup";
import { SearchList } from "./search-list";
import { CustomLink } from "./custom-link";
import { Links } from "./links";
import { MobileNav } from "./mobile-nav";
import { AiOutlineCloseCircle, AiOutlineMenu } from "react-icons/ai";
import { UserRole } from "../repository/interfaces";

export function Header() {
  const [showBox, setShowBox] = useState<boolean>(false);
  const { userDetails } = useSelector(
    (state: RootState) => state.generalReducer
  );
  const [isMenuVisible, setMenuVisible] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <HStack
        shadow="1"
        position={"sticky"}
        top="0"
        zIndex={"1"}
        bg="white"
        h={["60px", "90px"]}
        w="100%"
        justifyContent={"space-between"}
        alignItems={"center"}
        px={[3, 20]}>
        <HStack space={3} alignItems="center">
          <Pressable onPress={() => navigate("/")}>
            <Image
              size={{ base: "90", md: "130" }}
              resizeMode={"contain"}
              source={{
                uri: "https://www.pmlive.com/__data/assets/image/0006/1360914/Pfizer_new_2021.jpeg",
              }}
              alt="Logo"
            />
          </Pressable>
          {isMenuVisible && <MobileNav />}
          <Box
            alignItems="center"
            display={["none", "flex"]}
            flexDirection={["row"]}>
            <Links />
          </Box>
        </HStack>
        <HStack alignItems="center" space={[2, 4]}>
          <SearchList showIcon={!isMenuVisible} />
          {userDetails.role !== undefined &&
            userDetails.role !== UserRole.Customer && (
              <Box
                alignItems="center"
                display={["none", "flex"]}
                flexDirection={["row"]}>
                <CustomLink to="/my-products" IconRef={BsFillBagFill} />
              </Box>
            )}
          <Pressable
            display={["none", "block"]}
            onPress={() => setShowBox((showBox) => !showBox)}>
            <Avatar
              source={{
                uri: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
              }}></Avatar>
          </Pressable>
          <Pressable
            display={["block", "none"]}
            onPress={() => setMenuVisible((curr) => !curr)}>
            {isMenuVisible ? (
              <AiOutlineCloseCircle size="30" />
            ) : (
              <AiOutlineMenu size="30" />
            )}
          </Pressable>
        </HStack>
      </HStack>
      {showBox && <AuthPopup setShowBox={setShowBox} />}
    </>
  );
}
