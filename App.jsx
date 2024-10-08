import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/home/home";
import LoginPage from "./pages/login/login";
import RegisterPage from "./pages/register/register";
import Dashboard from "./dashboard/dashboard";
import ListProduct from "./pages/product/product";
import ProductDetail from "./pages/product/productDetail";
import Cart from "./pages/product/cart";
import { CartProvider } from "./pages/product/cartContext";

function App() {
  const router = createBrowserRouter([
    { path: "/", element: <HomePage /> },
    { path: "/login", element: <LoginPage /> },
    { path: "/register", element: <RegisterPage /> },
    { path: "/dashboard", element: <Dashboard /> },
    { path: "/product", element: <ListProduct /> },
    { path: "/productDetail/:id", element: <ProductDetail /> },
    { path: "/cart", element: <Cart /> },
  ]);

  return (
    <CartProvider>
      <RouterProvider router={router} />
    </CartProvider>
  );
}

export default App;