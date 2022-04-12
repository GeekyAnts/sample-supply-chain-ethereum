import { NavLink, useMatch, useResolvedPath } from "react-router-dom";
export const CustomLink = ({ to, IconRef, ...props }: any) => {
  let resolved = useResolvedPath(to);
  let match = useMatch({ path: resolved.pathname, end: true });

  return (
    <>
      <NavLink style={{ marginRight: "0.5rem" }} to={to} {...props}>
        <IconRef size={35} className={match ? "icon-active" : "theme-color"} />
      </NavLink>
    </>
  );
};
