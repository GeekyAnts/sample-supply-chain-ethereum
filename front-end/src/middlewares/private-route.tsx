import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router";
import { RootState } from "../store/reducers";

const PrivateRoute = ({ children }: any) => {
  const { isUserLoggedIn } = useSelector(
    (state: RootState) => state.generalReducer
  );
  const state = useLocation();
  // const user = localStorage.getItem("LOGGEDIN_USER");

  return isUserLoggedIn ? (
    children
  ) : (
    <Navigate replace to="/" state={{ from: state.pathname }} />
  );
};

export default PrivateRoute;
