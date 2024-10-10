import { Button, Form, Input, InputNumber, Select, Upload } from "antd";
import MemberCRUDTemplate from "../../../components/CRUD-template/member/MemberCRUDTemplate";
import LayoutTemplate from "../../../components/header-footer-template/LayoutTemplate";
import "./ManageFish.css";
function ManageFish() {
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (text) => <img src={text} alt="Koi" style={{ width: "100px" }} />,
    },
    {
      title: "Body Shape",
      dataIndex: "bodyShape",
      key: "bodyShape",
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Size",
      dataIndex: "size",
      key: "size",
    },
    {
      title: "Weight",
      dataIndex: "weight",
      key: "weight",
    },
    {
      title: "Breed",
      dataIndex: "breed",
      key: "breed",
    },
    {
      title: "Origin",
      dataIndex: "origin",
      key: "origin",
    },
    {
      title: "Pond",
      dataIndex: "pond",
      key: "pond",
    },
  ];
  const formItems = (
    <>
      <Form.Item
        label="Name"
        name="name"
        rules={[
          {
            required: true,
            message: "Please enter Koi Fish name!",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Body Shape"
        name="bodyShape"
        rules={[
          {
            required: true,
            message: "Please enter Koi Fish Body Shape!",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Age"
        name="age"
        rules={[
          {
            required: true,
            message: "Please enter Koi Fish Age!",
          },
          {
            type: "number",
            min: 0,
            message: "Invalid Age!",
          },
        ]}
      >
        <InputNumber />
      </Form.Item>
      <Form.Item
        label="Size (cm)"
        name="size"
        rules={[
          {
            required: true,
            message: "Please enter Koi Fish size!",
          },
          {
            type: "number",
            min: 0,
            message: "Invalid size!",
          },
        ]}
      >
        <InputNumber step={0.1} />
      </Form.Item>
      <Form.Item
        label="Weight (kg)"
        name="weight"
        rules={[
          {
            required: true,
            message: "Please enter Koi Fish weight!",
          },
          {
            type: "number",
            min: 0,
            message: "Invalid weight!",
          },
        ]}
      >
        <InputNumber step={0.1} />
      </Form.Item>
      <Form.Item
        label="Gender"
        name="gender"
        rules={[
          {
            required: true,
            message: "Please enter Koi Fish Gender!",
          },
        ]}
      >
        <Select>
          <Select.Option value="Male">Male</Select.Option>
          <Select.Option value="Female">Female</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item
        label="Breed"
        name="breed"
        rules={[
          {
            required: true,
            message: "Please enter Koi Fish Breed!",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Origin"
        name="origin"
        rules={[
          {
            required: true,
            message: "Please enter Koi Fish Origin!",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Pond"
        name="pond"
        rules={[
          {
            required: true,
            message: "Please enter Koi Fish Pond!",
          },
        ]}
      >
        <Input />
      </Form.Item>
    </>
  );

  const koiFish = [
    {
      name: "Sakura",
      imgSrc:
        "https://images.unsplash.com/photo-1640529837996-b81a91eaf7a5?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      bodyShape: "Long and slender",
      age: "3 years",
      size: "15 inches",
      weight: "2.5 lbs",
      breed: "Kohaku",
      origin: "Japan",
      pond: "Main Pond",
    },
    {
      name: "Ryuu",
      imgSrc:
        "https://images.unsplash.com/photo-1640529837996-b81a91eaf7a5?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      bodyShape: "Rounded",
      age: "4 years",
      size: "18 inches",
      weight: "3.2 lbs",
      breed: "Showa",
      origin: "Japan",
      pond: "Upper Pond",
    },
    {
      name: "Mizu",
      imgSrc:
        "https://images.unsplash.com/photo-1640529837996-b81a91eaf7a5?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      bodyShape: "Compact",
      age: "2 years",
      size: "12 inches",
      weight: "1.8 lbs",
      breed: "Asagi",
      origin: "China",
      pond: "Lower Pond",
    },
    {
      name: "Hoshi",
      imgSrc:
        "https://images.unsplash.com/photo-1640529837996-b81a91eaf7a5?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      bodyShape: "Streamlined",
      age: "5 years",
      size: "20 inches",
      weight: "4.0 lbs",
      breed: "Sanke",
      origin: "Japan",
      pond: "Main Pond",
    },
    {
      name: "Kumo",
      imgSrc:
        "https://images.unsplash.com/photo-1640529837996-b81a91eaf7a5?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      bodyShape: "Oval",
      age: "1 year",
      size: "8 inches",
      weight: "1.2 lbs",
      breed: "Tancho",
      origin: "Korea",
      pond: "Nursery Pond",
    },
  ];

  return (
    <div>
      <LayoutTemplate>
        <div
          className="fish row"
          style={{ padding: "120px", "--bs-gutter-x": "0" }}
        >
          <MemberCRUDTemplate formItems={formItems} />
          {koiFish.map((fish, index) => (
            <div
              key={index}
              className="row"
              style={{
                marginBottom: "20px",
                border: "1px solid #e0e0e0",
                borderRadius: "15px",
                padding: "30px 0",
              }}
            >
              <div
                className="col-md-4"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <img
                  src={fish.imgSrc}
                  alt={fish.name}
                  style={{
                    width: "320px",
                    height: "320px",
                    borderRadius: "15px",
                    objectFit: "cover",
                  }}
                />
              </div>
              {/* Fish contents */}
              <div className=" fish_contents col-md-8 row ">
                <h2 style={{ color: "#FF6900" }}>{fish.name}</h2>
                <div className="row mt-5">
                  <div className="col-md-4">
                    <p>
                      <strong>Body Shape: </strong>
                      {fish.bodyShape}
                    </p>
                    <p>
                      <strong>Age: </strong>
                      {fish.age}
                    </p>
                  </div>

                  <div className="col-md-4">
                    <p>
                      <strong>Size: </strong>
                      {fish.size}
                    </p>
                    <p>
                      <strong>Weight: </strong>
                      {fish.weight}
                    </p>
                  </div>

                  <div className="col-md-4">
                    <p>
                      <strong>Breed: </strong>
                      {fish.breed}
                    </p>
                    <p>
                      <strong>Origin: </strong>
                      {fish.origin}
                    </p>
                    <p>
                      <strong>Pond: </strong>
                      {fish.pond}
                    </p>
                  </div>
                </div>
                <div className="CRUD_button ">
                  <Button style={{ backgroundColor: "#FF6900", color: "#fff" }}>
                    Update
                  </Button>
                  <Button style={{ backgroundColor: "#000", color: "#fff" }}>
                    Delete
                  </Button>
                </div>
              </div>
              {/* End fish contents */}
            </div>
          ))}
        </div>
      </LayoutTemplate>
    </div>
  );
}

export default ManageFish;
