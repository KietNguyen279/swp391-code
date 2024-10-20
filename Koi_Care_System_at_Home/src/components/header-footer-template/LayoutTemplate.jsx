import { Badge, Button, Menu } from "antd";
import { Footer, Header } from "antd/es/layout/layout";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./LayoutTemplate.css";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";

function LayoutTemplate({ children }) {
  const navigate = useNavigate();
  const cart = useSelector((store) => store.cart);

  const handleNavigation = (router) => {
    navigate(router);
  };
  return (
    <div>
      <Header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "#FF6900",
          height: "90px",
        }}
      >
        <div>
          <Link to={"/"} className="icon">
            KOI AND HEALTH
          </Link>
        </div>
        <Menu
          mode="horizontal"
          style={{
            backgroundColor: "#FF6900",
            flex: "1",
            borderBottom: "none",
            display: "flex",
            justifyContent: "end",
          }}
          // theme="dark"
        >
          <Menu.Item key="home">
            <a className="menu_item" href="/">
              Home
            </a>
          </Menu.Item>
          <Menu.Item key="about">
            <a className="menu_item" href="#about">
              About Us
            </a>
          </Menu.Item>
          <Menu.SubMenu
            style={{ color: "#fff" }}
            className="menu_item"
            key="service"
            title="Sevice"
          >
            <Menu.Item key="fish-manage">
              <a className="subMenu_item" href="/fishmanage">
                Fish Manage
              </a>
            </Menu.Item>
            <Menu.Item key="pond-manage">
              <a className="subMenu_item" href="/pondmanage">
                Pond Manage
              </a>
            </Menu.Item>
          </Menu.SubMenu>
          <Menu.Item key="product">
            <a className="menu_item" href="#products">
              Product
            </a>
          </Menu.Item>
          <Menu.Item key="blogs">
            <a className="menu_item" href="#blogs">
              Blogs
            </a>
          </Menu.Item>
          <Menu.Item key="contact">
            <a className="menu_item" href="#contact">
              Contact Us
            </a>
          </Menu.Item>
        </Menu>
        <div
          className="auth-buttons"
          style={{ marginLeft: "40px", display: "flex", gap: "20px" }}
        >
          <Button
            onClick={() => handleNavigation("/login")}
            className="sign-in-btn"
          >
            Sign In
          </Button>
          <Button
            onClick={() => handleNavigation("/register")}
            className="register-btn"
          >
            Register
          </Button>
          <Button
            onClick={() => {
              navigate("/cart");
            }}
          >
            <Badge count={cart.length}>
              <ShoppingCartOutlined
                size={100}
                style={{ fontSize: 23, color: "#000" }}
              />
            </Badge>
          </Button>
        </div>
      </Header>
      {children}
      <Footer
        style={{
          textAlign: "center",
          backgroundColor: "#FF6900",
          color: "#fff",
          fontSize: "large",
        }}
      >
        <div className="row">
          <div className="col-md-4">
            <Link to={"/"} className="icon">
              KOI AND HEALTH
            </Link>
          </div>
        </div>
        Koi And Health ©{new Date().getFullYear()} Created by Koi Team
      </Footer>
    </div>
  );
}

export default LayoutTemplate;
