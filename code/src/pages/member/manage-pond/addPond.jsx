import React, { useState } from "react";
import { Modal, Form, Input, InputNumber, Button, message } from "antd";

function AddPond({ open, onClose, onAdd }) {
  const [newPond, setNewPond] = useState({
    name: "",
    image: "",
    size: 0,
    depth: 0,
    volume: 0,
    num_of_drains: 0,
    pump_capacity: 0,
  });

  const [errors, setErrors] = useState({});

  const handleChange = (name, value) => {
    setNewPond((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleAdd = () => {
    const newErrors = {};
    Object.entries(newPond).forEach(([key, value]) => {
      if (!value && value !== 0) {
        newErrors[key] = `${key.replace("_", " ")} is required.`;
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      message.warning("Please fill in all required fields.");
      return;
    }

    onAdd(newPond);
    setNewPond({
      name: "",
      image: "",
      size: 0,
      depth: 0,
      volume: 0,
      num_of_drains: 0,
      pump_capacity: 0,
    });
    setErrors({});
    onClose();
  };

  return (
    <Modal
      title="Add New Pond"
      visible={open}
      onCancel={onClose}
      footer={[
        <Button key="cancel" onClick={onClose}>
          Cancel
        </Button>,
        <Button key="add" type="primary" onClick={handleAdd}>
          Add Pond
        </Button>,
      ]}
    >
      <Form layout="vertical">
        {[
          { label: "Name", name: "name", type: "text" },
          { label: "Image URL", name: "image", type: "text" },
          { label: "Size (m²)", name: "size", type: "number" },
          { label: "Depth (m)", name: "depth", type: "number" },
          { label: "Volume (L)", name: "volume", type: "number" },
          { label: "Number of Drains", name: "num_of_drains", type: "number" },
          {
            label: "Pump Capacity (L/h)",
            name: "pump_capacity",
            type: "number",
          },
        ].map(({ label, name, type }) => (
          <Form.Item key={name} label={label} required>
            <InputNumber
              type={type}
              value={newPond[name]}
              onChange={(value) => handleChange(name, value)}
              status={errors[name] ? "error" : ""}
            />
            {errors[name] && <div style={{ color: "red" }}>{errors[name]}</div>}
          </Form.Item>
        ))}
      </Form>
    </Modal>
  );
}

export default AddPond;
