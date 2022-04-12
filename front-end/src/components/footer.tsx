import { Box, HStack, Link } from "native-base";
import { BsFacebook, BsInstagram, BsTwitter, BsYoutube } from "react-icons/bs";
export function Footer() {
  return (
    <HStack
      px={["0", "5"]}
      mt="-5"
      bgColor="transparent"
      justifyContent={"space-between"}
      flexDirection={["column-reverse", "row"]}
      alignItems="center">
      <HStack space={3}>
        <Link
          _text={{
            fontWeight: "medium",
            fontSize: "xs",
          }}>
          Terms and conditions
        </Link>
        <Link
          _text={{
            fontWeight: "medium",
            fontSize: "xs",
          }}>
          Privacy Policy
        </Link>
      </HStack>
      <Box>
        <HStack space="2">
          <BsFacebook className="icon" />
          <BsInstagram className="icon" />
          <BsTwitter className="icon" />
          <BsYoutube className="icon" />
        </HStack>
      </Box>
    </HStack>
  );
}
