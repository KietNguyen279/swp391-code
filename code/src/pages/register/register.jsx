import { Button, Form, Input } from "antd";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthenTemplate from "../../components/authen-template/authenTemplate";
import { toast } from "react-toastify";
import api from "../../config/axios";

function RegisterPage() {
  const navigate = useNavigate();
  const handleRegister = async (values) => {
    try {
      const response = await api.post("register", values);
      toast.success("Register successfully");
      navigate("/login");
    } catch (error) {
      toast.error(error.response.data);
    }
  };
  return (
    <AuthenTemplate>
      {/* <Form labelCol={{ span: 24 }} onFinish={handleRegister}>
        <h1>Register</h1>
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
        <Form.Item
          label="Confirm Password"
          name="password"
          rules={[{ required: true, message: "Please confirm your password!" }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: "Please input your email!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Phone"
          name="phone"
          rules={[
            { required: true, message: "Please input your phone number!" },
          ]}
        >
          <Input />
        </Form.Item>
        <Link to="/login">Already have an account? Click here to login</Link>
        <br />
        <div className="button-container">
          <Button type="primary" htmlType="submit" className="register-button">
            Register
          </Button>
        </div>
      </Form> */}
      <Form labelCol={{ span: 24 }} onFinish={handleRegister}>
        <Form.Item
          label="Phone"
          name="phone"
          rules={[
            { required: true, message: "Please input your phone number!" },
          ]}
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
        <Form.Item
          label="Full name"
          name="fullName"
          rules={[{ required: true, message: "Please input your full name!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: "Please input your email!" }]}
        >
          <Input />
        </Form.Item>
        <Link to="/login">Already have an account? Click here to login</Link>
        <br />
        <div className="button-container">
          <Button type="primary" htmlType="submit" className="register-button">
            Register
          </Button>
        </div>
      </Form>
    </AuthenTemplate>
  );
}

export default RegisterPage;
