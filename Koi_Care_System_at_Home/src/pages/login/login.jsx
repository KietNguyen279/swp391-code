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
      // setSubmitting(true);
      const response = await api.post("/auth/login", values);
      console.log(response.data);
      // dispatch(login(response.data));
      toast.success("Login successfully!");
      const { role, token } = response.data;
      localStorage.setItem("token", token);
      navigate("/");
      if (role === "ADMIN") {
        navigate("/dashboard");
      }
    } catch (error) {
      toast.error(error.response.data);
    }
    // finally {
    //   setSubmitting(false);
    // }
  };
  return (
    <AuthenTemplate>
      <Form labelCol={{ span: 24 }} onFinish={handleLogin}>
        <h1>Login</h1>
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: "Please input email!" }]}
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
