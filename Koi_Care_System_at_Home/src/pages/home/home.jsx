import { Carousel, Menu } from "antd";
import { Header } from "antd/es/layout/layout";
import React from "react";
import { Nav } from "react-bootstrap";
import "./home.css";

function HomePage() {
  return (
    <div>
      <Header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "#FF6900",
        }}
      >
        <div className="logo">
          <span className="icon">KOI AND HEALTH Hehe</span>
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
          <button className="sign-in-btn">Sign In</button>
          <button className="register-btn">Register</button>
        </div>
      </Header>
      <Carousel arrows infinite={false}>
        <div style={{ position: "relative" }}>
          <img
            src="https://images.unsplash.com/photo-1562588809-bba40976d53d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Koi Fish"
            style={{
              backgroundRepeat: "no-repeat",
              height: "450px",
              width: "100%",
            }}
          />
          <h3 className="carousel_content_1">
            Pond environments and Koi fish are very sensitive, with problems
            occurring even in the cleanest of ponds. When you have sick pond
            fish or serious water quality issues, you need an experienced pond
            care service you can trust. Koi Health & Pond Care provides
            experienced, professional pond management services to residential
            and commercial Koi ponds of all sizes.
          </h3>
        </div>
        <div>
          <h3 className="carousel_content_2"></h3>
        </div>
        <div>
          <h3 className="carousel_content_3"></h3>
        </div>
      </Carousel>
    </div>
  );
}

export default HomePage;
