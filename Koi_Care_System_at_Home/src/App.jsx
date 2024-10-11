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
      path: "/dashboard",
      element: <Dashboard />,
      children: [
        {
          path: "usermanager",
          element: <ManageUser />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
