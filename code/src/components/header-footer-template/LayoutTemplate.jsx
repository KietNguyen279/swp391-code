import { Badge, Button, Menu, Dropdown } from "antd";
import { Footer, Header } from "antd/es/layout/layout";
import { Link, useNavigate } from "react-router-dom";
import "./LayoutTemplate.css";
import {
  ShoppingCartOutlined,
  UserOutlined,
  LoginOutlined,
  DashboardOutlined,
} from "@ant-design/icons";
import { useSelector } from "react-redux";

function LayoutTemplate({ children }) {
  const navigate = useNavigate();
  const name = localStorage.getItem("name");
  const role = localStorage.getItem("role");
  const cart = useSelector((store) => store.cart);

  const handleNavigation = (router) => {
    navigate(router);
  };

  const handleLogout = () => {
    // Clear the local storage
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("name");

    // Navigate to the home page
    navigate("/");
  };

  const menu = (
    <Menu>
      <Menu.Item>
        <Button
          type="text"
          onClick={handleNavigation("/profile")}
          style={{ color: "black" }}
        >
          Profile
        </Button>
      </Menu.Item>
      <Menu.Item>
        <Button type="text" onClick={handleLogout} style={{ color: "black" }}>
          Logout
        </Button>
      </Menu.Item>
    </Menu>
  );

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
            display: "block",
            justifyContent: "end",
            textAlign: "center",
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
            <a className="menu_item" href="/listProduct">
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
          {/*{role === "SHOP" || role === "ADMIN" && (*/}
          {/*<Menu.Item key="dashboard">*/}
          {/*    <a className="menu_item" href="/dashboard">*/}
          {/*        Dashboard*/}
          {/*    </a>*/}
          {/*</Menu.Item>*/}
          {/*)}*/}
        </Menu>
        <div
          className="auth-buttons"
          style={{ marginLeft: "40px", display: "flex", gap: "30px" }}
        >
          {name ? (
            <>
              <div>
                <Dropdown overlay={menu} trigger={["click"]}>
                  <Button style={{ width: "80px", backgroundColor: "white" }}>
                    <UserOutlined
                      style={{
                        fontSize: "20px",
                        color: "black",
                      }}
                    />
                    <p
                      style={{
                        display: "inline-block",
                        transform: "translateY(5px)",
                      }}
                    >
                      {" "}
                      {name}
                    </p>
                  </Button>
                </Dropdown>
              </div>
              <div>
                {role === "SHOP" || role === "ADMIN" ? (
                  <Button
                    onClick={() => {
                      navigate("/dashboard");
                    }}
                  >
                    <DashboardOutlined />
                    <p
                      style={{
                        display: "inline-block",
                        transform: "translateY(5px)",
                      }}
                    >
                      Dashboard
                    </p>
                  </Button>
                ) : (
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
                )}
              </div>
            </>
          ) : (
            <>
              <div>
                <Button
                  onClick={() => handleNavigation("/login")}
                  className="sign-in-btn"
                >
                  <LoginOutlined
                    style={{
                      fontSize: "15px",
                      transform: "translateY(2px)",
                      color: "red",
                    }}
                  />{" "}
                  Login
                </Button>
              </div>
              <div className="col-4 header-loginw3ls">
                <Button
                  onClick={() => handleNavigation("/register")}
                  className="register-btn"
                >
                  Register
                </Button>
              </div>
            </>
          )}
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
