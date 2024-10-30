import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/home/home";
import LoginPage from "./pages/login/login";
import RegisterPage from "./pages/register/register";
import Dashboard from "./dashboard/dashboard";
import ManageUser from "./pages/admin/manage-user/ManageUser";
import ManageFish from "./pages/member/manage-fish/ManageFish";
import ManagePond from "./pages/member/manage-pond/ManagePond";
import CartPage from "./pages/cart/CartPage";
import ListProduct from "./pages/product/ListProduct";
import ProductDetail from "./pages/product/ProductDetail.jsx";
import ViewFish from "./dashboard/manage-fish/ViewFish.jsx";
import ViewPond from "./dashboard/manage-pond/ViewPond.jsx";
import ManageProduct from "./dashboard/manage-product/ManageProduct.jsx";
import UserProfile from "./pages/profile/profile.jsx";
import ViewProfile from "./pages/profile/manage-profile/ViewProfile.jsx";
import ViewOrderList from "./pages/profile/manage-order/ViewOrderList.jsx";
import BlogDetail from "./pages/blogs/blogDetail.jsx";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomePage />,
    },
    {
      path: "/fishmanage",
      element: <ManageFish />,
    },
    {
      path: "/pondmanage",
      element: <ManagePond />,
    },
    {
      path: "/login",
      element: <LoginPage />,
    },
    {
      path: "/register",
      element: <RegisterPage />,
    },
    {
      path: "/cart",
      element: <CartPage />,
    },

    {
      path: "/listProduct",
      element: <ListProduct />,
    },
    {
      path: "/productDetail/:id",
      element: <ProductDetail />,
    },
    {
      path: "/dashboard",
      element: <Dashboard />,
      children: [
        {
          path: "usermanagement",
          element: <ManageUser />,
        },
        {
          path: "productmanagement",
          element: <ManageProduct />,
        },
        {
          path: "viewfish",
          element: <ViewFish />,
        },
        {
          path: "viewpond",
          element: <ViewPond />,
        },
      ],
    },
    {
      path: "/blogDetail/:id",
      element: <BlogDetail />,
    },
    {
      path: "/profile",
      element: <UserProfile />,
      children: [
        {
          path: "userProfile",
          element: <ViewProfile />,
        },
        {
          path: "orderList",
          element: <ViewOrderList />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
