import { Menu } from "antd";
import { Footer, Header } from "antd/es/layout/layout";
import React from "react";
import { useNavigate } from "react-router-dom";
import "./LayoutTemplate.css";

function LayoutTemplate({ children }) {
  const navigate = useNavigate();

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
        <div className="logo">
          <span className="icon">KOI AND HEALTH</span>
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
        >
          <Menu.Item key="home">
            <a className="menu_item" href="/">
              Home
            </a>
          </Menu.Item>
          <Menu.Item key="about">
            <a className="menu_item" href="/">
              About Us
            </a>
          </Menu.Item>
          <Menu.Item key="product">
            <a className="menu_item" href="/">
              Product
            </a>
          </Menu.Item>
          <Menu.Item key="blogs">
            <a className="menu_item" href="/">
              Blogs
            </a>
          </Menu.Item>
          <Menu.Item key="contact">
            <a className="menu_item" href="/">
              Contact Us
            </a>
          </Menu.Item>
        </Menu>
        <div
          className="auth-buttons"
          style={{ marginLeft: "40px", display: "flex", gap: "20px" }}
        >
          <button
            onClick={() => handleNavigation("/login")}
            className="sign-in-btn"
          >
            Sign In
          </button>
          <button
            onClick={() => handleNavigation("/register")}
            className="register-btn"
          >
            Register
          </button>
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
        Koi And Health ©{new Date().getFullYear()} Created by Koi Team
      </Footer>
    </div>
  );
}

export default LayoutTemplate;
