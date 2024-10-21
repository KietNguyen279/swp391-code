import { Button, Form, Input, InputNumber, Select, Upload } from "antd";
import MemberCRUDTemplate from "../../../components/CRUD-template/member/MemberCRUDTemplate";
import LayoutTemplate from "../../../components/header-footer-template/LayoutTemplate";
import "./ManageFish.css";
import { PlusOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import api from "../../../config/axios";
function ManageFish() {
  const [fish, setFish] = useState([]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);

  const fetchFish = async () => {
    try {
      const response = await api.get("koi");
      setFish(response.data);
    } catch (error) {
      console.log("Error loading fish: ", error);
    }
  };
  useEffect(() => {
    fetchFish();
  }, []);

  const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };

  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);
  const uploadButton = (
    <button
      style={{
        border: 0,
        background: "none",
      }}
      type="button"
    >
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </button>
  );

  const handleUpdateClick = (fish) => {
    setEditingIndex(fish);
    setFileList([{ uid: "-1", url: fish[fish].imgSrc }]);
  };

  const handleFormSubmit = async (values) => {
    try {
      const updatedFishData = {
        ...fish[editingIndex],

        age: `${values.age} years`,
        size: `${values.size} inches`,
        weight: `${values.weight} lbs`,
        pond: values.pond,
      };
      if (fileList.length > 0) {
        const formData = new FormData();
        formData.append("file", fileList[0].originFileObj);
        const uploadResponse = await api.post("/upload", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        updatedFishData.imgSrc = uploadResponse.data.url;
      }

      // Send updated fish data to the backend
      await api.put(`koi/${fish[editingIndex].id}`, updatedFishData);

      // Update local state to reflect the changes
      const updatedKoiFish = [...fish];
      updatedKoiFish[editingIndex] = updatedFishData;
      setFish(updatedKoiFish);

      console.log("Updated Fish Data:", updatedFishData);
      setEditingIndex(null); // Exit edit mode after submitting
    } catch (error) {
      console.error("Error updating fish:", error);
    }
  };

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
      <Form.Item label="image" name="image">
        <Upload
          action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
          listType="picture-card"
          fileList={fileList}
          onPreview={handlePreview}
          onChange={handleChange}
        >
          {fileList.length >= 8 ? null : uploadButton}
        </Upload>
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

  return (
    <div>
      <LayoutTemplate>
        <div
          className="fish row"
          style={{ padding: "120px", "--bs-gutter-x": "0" }}
        >
          <MemberCRUDTemplate formItems={formItems} />
          {fish.map((currentFish) => (
            <div
              key={currentFish.id}
              className="row"
              style={{
                marginBottom: "20px",
                border: "1px solid #e0e0e0",
                borderRadius: "15px",
                padding: "30px 0",
              }}
            >
              <div className="col-md-4 justify-content-center align-items-center">
                <img
                  src={currentFish.imgSrc}
                  alt={currentFish.name}
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
                <h2 style={{ color: "#FF6900" }}>{currentFish.name}</h2>
                <div className="row mt-5">
                  <div className="col-md-4">
                    <p>
                      <strong>Body Shape: </strong>
                      {currentFish.bodyShape}
                    </p>
                    <p>
                      <strong>Age: </strong>
                      {editingIndex === currentFish.id ? (
                        <Form.Item
                          name="age"
                          initialValue={parseInt(currentFish.age)}
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
                      ) : (
                        currentFish.age
                      )}
                    </p>
                  </div>
                  <div className="col-md-4">
                    <p>
                      <strong>Size: </strong>
                      {editingIndex === currentFish.id ? (
                        <Form.Item
                          name="size"
                          initialValue={parseFloat(currentFish.size)}
                          rules={[
                            {
                              required: true,
                              message: "Please enter Koi Fish Size!",
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
                      ) : (
                        currentFish.size
                      )}
                    </p>
                    <p>
                      <strong>Weight: </strong>
                      {editingIndex === currentFish.id ? (
                        <Form.Item
                          name="weight"
                          initialValue={parseFloat(currentFish.weight)}
                          rules={[
                            {
                              required: true,
                              message: "Please enter Koi Fish Weight!",
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
                      ) : (
                        currentFish.weight
                      )}
                    </p>
                  </div>
                  <div className="col-md-4">
                    <p>
                      <strong>Breed: </strong>
                      {currentFish.breed}
                    </p>
                    <p>
                      <strong>Origin: </strong>
                      {currentFish.origin}
                    </p>
                    <p>
                      <strong>Pond: </strong>
                      {editingIndex === currentFish.id ? (
                        <Form.Item
                          name="pond"
                          initialValue={currentFish.pond}
                          rules={[
                            {
                              required: true,
                              message: "Please enter Koi Fish Pond!",
                            },
                          ]}
                        >
                          <Input />
                        </Form.Item>
                      ) : (
                        currentFish.pond
                      )}
                    </p>
                  </div>
                </div>
                <div className="CRUD_button ">
                  {editingIndex === currentFish.id ? (
                    <Button
                      type="primary"
                      onClick={() =>
                        handleFormSubmit({
                          age: currentFish.age,
                          size: currentFish.size,
                          weight: currentFish.weight,
                          pond: currentFish.pond,
                        })
                      }
                    >
                      Save
                    </Button>
                  ) : (
                    <>
                      <Button
                        style={{ backgroundColor: "#FF6900", color: "#fff" }}
                        onClick={() => handleUpdateClick(currentFish.id)}
                      >
                        Update
                      </Button>
                      <Button
                        style={{ backgroundColor: "#000", color: "#fff" }}
                      >
                        Delete
                      </Button>
                    </>
                  )}
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
