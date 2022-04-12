import { Link, Text } from "native-base";
import { NavLink } from "react-router-dom";

export function Links() {
  return (
    <>
      <NavLink
        className={(navData) => (navData.isActive ? "link-active" : "link")}
        to="/all-products">
        <Text fontWeight={"semibold"} fontSize="lg">
          Products
        </Text>
      </NavLink>
      <Link
        mx="4"
        my={["4", "0"]}
        isExternal
        href="https://blog.geekyants.com/"
        isUnderlined={false}>
        <Text fontWeight={"semibold"} fontSize="lg">
          Blogs
        </Text>
      </Link>
      <Link
        isExternal
        href="https://geekyants.com/#footer"
        isUnderlined={false}>
        <Text fontWeight={"semibold"} fontSize="lg">
          Contact Us
        </Text>
      </Link>
    </>
  );
}
