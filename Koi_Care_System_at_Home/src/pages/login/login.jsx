import React from "react";
import AuthenTemplate from "../../components/authen-template/authenTemplate";
import { Button, Form, Input } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function LoginPage() {
  const navigate = useNavigate();
  const handleRegisterButton = () => {
    navigate("/register");
  };

  // const handleLogin = () => {
  //   try {
  //     const response = await;
  //   } catch (error) {
  //     toast.error("");
  //   }
  // };
  return (
    <AuthenTemplate>
      <Form labelCol={{ span: 24 }}>
        <h1>Login</h1>
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: "Please input username!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input password!" }]}
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
