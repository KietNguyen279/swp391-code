import React, { useEffect, useState } from "react";
import LayoutTemplate from "../../../components/header-footer-template/LayoutTemplate";
import MemberCRUDTemplate from "../../../components/CRUD-template/member/MemberCRUDTemplate";
import { Button, Form, Input, InputNumber, Upload } from "antd";
import api from "../../../config/axios";
import { PlusOutlined } from "@ant-design/icons";
import FormItem from "antd/es/form/FormItem";

function ManagePond() {
  const [pond, setPond] = useState([]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);

  const fetchPond = async () => {
    try {
      const response = await api.get("pond");
      setPond(response.data);
    } catch (error) {
      console.log("Error loading pond: ", error);
    }
  };
  useEffect(() => {
    fetchPond();
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

  const handleUpdateClick = (pond) => {
    setEditingIndex(pond);
    setFileList([{ uid: "-1", url: pond[pond].imgSrc }]);
  };

  const handleFormSubmit = async (values) => {
    try {
      const updatedPondData = {
        ...pond[editingIndex],

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

        updatedPondData.imgSrc = uploadResponse.data.url;
      }

      // Send updated Pond data to the backend
      await api.put(`pond/${pond[editingIndex].id}`, updatedPondData);

      // Update local state to reflect the changes
      const updatedKoiPond = [...pond];
      updatedKoiPond[editingIndex] = updatedPondData;
      setPond(updatedKoiPond);

      console.log("Updated Pond Data:", updatedPondData);
      setEditingIndex(null); // Exit edit mode after submitting
    } catch (error) {
      console.error("Error updating pond:", error);
    }
  };

  const formItems = (
    <>
      <Form.Item
        label="Pond Name"
        name="name"
        rules={[
          {
            required: true,
            message: "Please enter the Pond name!",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item label="Image" name="image">
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
        label="Size (m²)"
        name="size"
        rules={[
          {
            required: true,
            message: "Please enter the Pond size!",
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
        label="Depth (m)"
        name="depth"
        rules={[
          {
            required: true,
            message: "Please enter the Pond depth!",
          },
          {
            type: "number",
            min: 0,
            message: "Invalid depth!",
          },
        ]}
      >
        <InputNumber step={0.1} />
      </Form.Item>

      <Form.Item
        label="Volume (liters)"
        name="volume"
        rules={[
          {
            required: true,
            message: "Please enter the Pond volume!",
          },
          {
            type: "number",
            min: 0,
            message: "Invalid volume!",
          },
        ]}
      >
        <InputNumber />
      </Form.Item>

      <Form.Item
        label="Number of Drains"
        name="num_of_drains"
        rules={[
          {
            required: true,
            message: "Please enter the number of drains!",
          },
          {
            type: "number",
            min: 0,
            message: "Invalid number of drains!",
          },
        ]}
      >
        <InputNumber />
      </Form.Item>

      <Form.Item
        label="Pump Capacity (liters/min)"
        name="pump_capacity"
        rules={[
          {
            required: true,
            message: "Please enter the Pump capacity!",
          },
          {
            type: "number",
            min: 0,
            message: "Invalid pump capacity!",
          },
        ]}
      >
        <InputNumber />
      </Form.Item>
    </>
  );

  return (
    <div>
      <LayoutTemplate>
        <div
          className="pond row"
          style={{ padding: "120px", "--bs-gutter-x": "0" }}
        >
          <MemberCRUDTemplate formItems={formItems} />
          {pond.map((currentPond) => (
            <div
              key={currentPond.id}
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
                  src={currentPond.imgSrc}
                  alt={currentPond.name}
                  style={{
                    width: "320px",
                    height: "320px",
                    borderRadius: "15px",
                    objectFit: "cover",
                  }}
                />
              </div>
              {/* Pond contents */}
              <div className=" pond_contents col-md-8 row ">
                <h2 style={{ color: "#FF6900" }}>{currentPond.name}</h2>
                <div className="row mt-5">
                  <div className="col-md-4">
                    <p>
                      <strong>Size: </strong>
                      {editingIndex === currentPond.id ? (
                        <Form.Item
                          name="size"
                          initialValue={parseFloat(currentPond.size)}
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
                        currentPond.size
                      )}
                    </p>
                    <p>
                      <strong>Depth: </strong>
                      {editingIndex === currentPond.id ? (
                        <Form.Item
                          name="depth"
                          initialValue={parseFloat(currentPond.depth)}
                          rules={[
                            {
                              required: true,
                              message: "Please enter Koi Pond Depth!",
                            },
                            {
                              type: "number",
                              min: 0,
                              message: "Invalid Depth!",
                            },
                          ]}
                        >
                          <InputNumber step={0.1} />
                        </Form.Item>
                      ) : (
                        currentPond.age
                      )}
                    </p>
                  </div>
                  <div className="col-md-4">
                    <p>
                      <strong>Volume: </strong>
                      {editingIndex === currentPond.id ? (
                        <Form.Item
                          name="volume"
                          initialValue={parseInt(currentPond.volume)}
                          rules={[
                            {
                              required: true,
                              message: "Please enter Koi Fish Volume!",
                            },
                            {
                              type: "number",
                              min: 0,
                              message: "Invalid weight!",
                            },
                          ]}
                        >
                          <InputNumber />
                        </Form.Item>
                      ) : (
                        currentPond.volume
                      )}
                    </p>
                  </div>
                  <div className="col-md-4">
                    <p>
                      <strong>Number of Drains: </strong>
                      {currentPond.num_of_drains}
                      {editingIndex === currentPond.id ? (
                        <Form.Item
                          name="volume"
                          initialValue={parseInt(currentPond.num_of_drains)}
                          rules={[
                            {
                              required: true,
                              message: "Please enter Koi Fish Volume!",
                            },
                            {
                              type: "number",
                              min: 0,
                              message: "Invalid weight!",
                            },
                          ]}
                        >
                          <InputNumber />
                        </Form.Item>
                      ) : (
                        currentPond.num_of_drains
                      )}
                    </p>
                    <p>
                      <strong>Pump Capacity: </strong>
                      {currentPond.pump_capacity}
                      {editingIndex === currentPond.id ? (
                        <Form.Item
                          name="volume"
                          initialValue={parseInt(currentPond.pump_capacity)}
                          rules={[
                            {
                              required: true,
                              message: "Please enter Koi Fish Volume!",
                            },
                            {
                              type: "number",
                              min: 0,
                              message: "Invalid Pump Capacity!",
                            },
                          ]}
                        >
                          <InputNumber />
                        </Form.Item>
                      ) : (
                        currentPond.pump_capacity
                      )}
                    </p>
                  </div>
                </div>
                <div className="CRUD_button ">
                  {editingIndex === currentPond.id ? (
                    <Button
                      type="primary"
                      onClick={() =>
                        handleFormSubmit({
                          size: currentPond.size,
                          weight: currentPond.weight,
                          pond: currentPond.pond,
                        })
                      }
                    >
                      Save
                    </Button>
                  ) : (
                    <>
                      <Button
                        style={{ backgroundColor: "#FF6900", color: "#fff" }}
                        onClick={() => handleUpdateClick(currentPond.id)}
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

export default ManagePond;
