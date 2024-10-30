import React from "react";
import AuthenTemplate from "../../components/authen-template/authenTemplate";
import { Button, Form, Input } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../config/axios";

function LoginPage() {
  const navigate = useNavigate();

  const handleRegisterButton = () => {
    navigate("/register");
  };

  const handleLogin = async (values) => {
    try {
      const login = await api.post("/auth/login", values);
      const { token } = login.data; // Destructure token from response
      localStorage.setItem("token", token);

      const userRes = await api.get("/auth/profile", values);
      const { role, name } = userRes.data.user; // Destructure role and name

      localStorage.setItem("role", role);
      localStorage.setItem("name", name);

      toast.success("Login successful!");
      navigate("/")
      // if (role === "ADMIN") {
      //   navigate("/dashboard");
      // } else {
      //   navigate("/");
      // }
    } catch (error) {
      // Handle error gracefully
      const errorMessage = error.response?.data?.message || "An unexpected error occurred. Please try again.";
      toast.error(errorMessage);
    }
  };

  return (
      <AuthenTemplate>
        <Form labelCol={{ span: 24 }} onFinish={handleLogin}>
          <h1>Login</h1>
          <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, message: "Please input your email!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password />
          </Form.Item>
          <div className="button-container">
            <Button type="primary" htmlType="submit" className="login-button">
              Login
            </Button>
            <Button onClick={handleRegisterButton} className="register-button">
              Register
            </Button>
          </div>
        </Form>
      </AuthenTemplate>
  );
}

export default LoginPage;