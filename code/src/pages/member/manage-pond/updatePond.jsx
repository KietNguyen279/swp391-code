import React, { useState, useEffect } from "react";
import { Modal, Button, Input, InputNumber, Typography, Form } from "antd";

const { Text } = Typography;

function UpdatePond({ open, onClose, pond, onUpdate, onDelete }) {
  const [updatedPond, setUpdatedPond] = useState(pond);

  useEffect(() => {
    setUpdatedPond(pond);
  }, [pond]);

  const handleChange = (name, value) => {
    setUpdatedPond((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = () => {
    onUpdate(updatedPond);
    onClose();
  };

  const handleDelete = () => {
    onDelete(updatedPond.id);
    onClose();
  };

  return (
    <Modal
      title="Update Pond Details"
      visible={open}
      onCancel={onClose}
      footer={[
        <Button key="delete" type="danger" onClick={handleDelete}>
          Delete
        </Button>,
        <Button key="update" type="primary" onClick={handleUpdate}>
          Update Pond
        </Button>,
      ]}
    >
      {updatedPond && (
        <Form layout="vertical">
          <Form.Item label="Name">
            <Input
              value={updatedPond.name}
              onChange={(e) => handleChange("name", e.target.value)}
            />
          </Form.Item>
          <Form.Item label="Image URL">
            <Input
              value={updatedPond.image}
              onChange={(e) => handleChange("image", e.target.value)}
            />
          </Form.Item>
          <Form.Item label="Size (m²)">
            <InputNumber
              value={updatedPond.size}
              onChange={(value) => handleChange("size", value)}
            />
          </Form.Item>
          <Form.Item label="Depth (m)">
            <InputNumber
              value={updatedPond.depth}
              onChange={(value) => handleChange("depth", value)}
            />
          </Form.Item>
          <Form.Item label="Volume (L)">
            <InputNumber
              value={updatedPond.volume}
              onChange={(value) => handleChange("volume", value)}
            />
          </Form.Item>
          <Form.Item label="Number of Drains">
            <InputNumber
              value={updatedPond.num_of_drains}
              onChange={(value) => handleChange("num_of_drains", value)}
            />
          </Form.Item>
          <Form.Item label="Pump Capacity (L/h)">
            <InputNumber
              value={updatedPond.pump_capacity}
              onChange={(value) => handleChange("pump_capacity", value)}
            />
          </Form.Item>
        </Form>
      )}
    </Modal>
  );
}

export default UpdatePond;
