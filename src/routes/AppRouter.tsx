import Header from "../pages/header/Header";
import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage/HomePage";
import ProductList from "../pages/ProductList/ProductList";
import ShopingCart from "../pages/ShopingCart/ShopingCart";
import ProductDetails from "../pages/ProductDetails/ProductDetails";
import Login from "../pages/authUser/Login";
import SignUp from "../pages/authUser/SignUp";
import { useSelector } from "react-redux";
import type { RootState } from "../store/store";
// import CrudMaster from "../pages/CRUDMaster/CrudMaster";
import ProductGallary from "../pages/ProductGallary/ProductGallary";

const AppRouter = () => {
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

  return (
    <>
      {isLoggedIn && <Header />}
      <Routes>
        {/* Public Routes */}
        <Route
          path="/login"
          element={!isLoggedIn ? <Login /> : <Navigate to="/" />}
        />
        <Route
          path="/signup"
          element={!isLoggedIn ? <SignUp /> : <Navigate to="/" />}
        />
        {/* private routes */}
        <Route
          path="/"
          element={isLoggedIn ? <HomePage /> : <Navigate to="/signup" />}
        />
        <Route
          path="/product-list"
          element={isLoggedIn ? <ProductList /> : <Navigate to="/signup" />}
        />
        <Route
          path="/productsDetails/:id"
          element={isLoggedIn ? <ProductDetails /> : <Navigate to="/signup" />}
        />
        <Route
          path="/shoping-cart"
          element={isLoggedIn ? <ShopingCart /> : <Navigate to="/signup" />}
        />
         {/* <Route
          path="/crud-master"
          element={isLoggedIn ? <CrudMaster /> : <Navigate to="/signup" />}
        /> */}
        <Route
          path="/product-gallary"
          element={isLoggedIn ? <ProductGallary /> : <Navigate to="/signup" />}
        />

        {/* Catch all unmatched paths */}
        <Route
          path="*"
          element={<Navigate to={isLoggedIn ? "/" : "/signup"} />}
        />
      </Routes>
      {/* {!isLoggedIn ? (
        <Routes>
          <Route path="/" element={<Navigate to="/signup" />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      ) : (
        <>
          <Header />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/product-list" element={<ProductList />} />
            <Route path="/productsDetails/:id" element={<ProductDetails />} />
            <Route path="/shoping-cart" element={<ShopingCart />} />
          </Routes>
        </>
      )} */}
    </>
  );
};

export default AppRouter;
