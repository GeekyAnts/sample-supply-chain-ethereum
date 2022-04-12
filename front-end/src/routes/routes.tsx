import { Route, Routes as ParentRoutes } from "react-router-dom";
import PrivateRoute from "../middlewares/private-route";
import {
  AddProductPage,
  ErrorPage,
  HomePage,
  AllProducts,
  MyProductsPage,
  ProductDetails,
  AddUserPage,
} from "../pages";
import { RootState } from "../store/reducers";
import { useDispatch, useSelector } from "react-redux";
import { setLoginStatus } from "../store/actions";
import { UserRole } from "../repository/interfaces";

const Routes = () => {
  const { isUserLoggedIn, userDetails } = useSelector(
    (state: RootState) => state.generalReducer
  );
  const dispatch = useDispatch();
  const user = localStorage.getItem("LOGGEDIN_USER");
  if (user && !isUserLoggedIn) {
    dispatch(setLoginStatus({ status: true }));
  }
  return (
    <ParentRoutes>
      <Route path="/" element={<HomePage />} />
      <Route path="/all-products" element={<AllProducts />} />
      <Route path="/product/:productid" element={<ProductDetails />} />
      <Route path="*" element={<ErrorPage />} />
      {userDetails.role === UserRole.Manufacturer && (
        <Route
          path="/add-product"
          element={
            <PrivateRoute>
              <AddProductPage />
            </PrivateRoute>
          }
        />
      )}
      {userDetails.role !== UserRole.Customer && (
        <>
          <Route
            path="/my-products"
            element={
              <PrivateRoute>
                <MyProductsPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/add-user"
            element={
              <PrivateRoute>
                <AddUserPage />
              </PrivateRoute>
            }
          />
        </>
      )}
    </ParentRoutes>
  );
};

export default Routes;
