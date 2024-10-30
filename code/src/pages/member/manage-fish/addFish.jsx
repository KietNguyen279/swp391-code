import { useState } from "react";
import { Modal, Form, Input, InputNumber, Button, message } from "antd";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import firebaseApp from "./firebase"; // Ensure your Firebase app is correctly configured and exported

function AddFish({ open, onClose, onAdd }) {
  const [newFish, setNewFish] = useState({
    name: "",
    image: "",
    body_shape: "",
    age: "",
    size: "",
    weight: "",
    gender: "",
    breed: "",
    origin: "",
    selling_price: "",
    pond_id: "",
  });

  const [errors, setErrors] = useState({});
  const [imageFile, setImageFile] = useState(null);
  const [imageURL, setImageURL] = useState(""); // To hold the uploaded image URL

  const handleChange = (name, value) => {
    setNewFish((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" })); // Clear error for the field being edited
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImageURL(URL.createObjectURL(file)); // Create a local URL for preview
      handleChange("image", file.name); // Store image file name
    }
  };

  const handleAdd = async () => {
    const newErrors = {};

    // Validate input fields
    Object.entries(newFish).forEach(([key, value]) => {
      if (!value) {
        newErrors[key] = `${key.replace('_', ' ')} is required.`;
      }
    });

    // If there are errors, set them and show a warning message
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      message.warning('Please fill in all required fields.');
      return;
    }

    // Upload the image to Firebase
    const storage = getStorage(firebaseApp);
    const storageRef = ref(storage, `fish_images/${imageFile.name}`);
    
    try {
      await uploadBytes(storageRef, imageFile);
      const url = await getDownloadURL(storageRef);
      newFish.image = url; // Set the image URL in newFish

      // Call the onAdd function with the new fish data
      onAdd(newFish);
      
      // Reset state
      setNewFish({
        name: "",
        image: "",
        body_shape: "",
        age: "",
        size: "",
        weight: "",
        gender: "",
        breed: "",
        origin: "",
        selling_price: "",
        pond_id: "",
      });
      setErrors({});
      setImageFile(null);
      setImageURL(""); // Reset image preview
      onClose(); // Close the modal after adding
    } catch (error) {
      message.error("Error uploading image. Please try again.");
    }
  };

  return (
    <Modal
      title="Add New Fish"
      visible={open}
      onCancel={onClose}
      footer={[
        <Button key="cancel" onClick={onClose}>
          Cancel
        </Button>,
        <Button key="add" type="primary" onClick={handleAdd}>
          Add Fish
        </Button>,
      ]}
    >
      <Form layout="vertical">
        <Form.Item label="Name" required>
          <Input
            value={newFish.name}
            onChange={(e) => handleChange("name", e.target.value)}
            status={errors.name ? 'error' : ''}
          />
          {errors.name && <div style={{ color: 'red' }}>{errors.name}</div>}
        </Form.Item>
        <Form.Item label="Image" required>
          <Input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            style={{ marginBottom: '10px' }}
          />
          {errors.image && <div style={{ color: 'red' }}>{errors.image}</div>}
          {imageURL && (
            <img
              src={imageURL}
              alt="Uploaded Preview"
              style={{ width: '100%', height: 'auto', marginTop: '10px' }}
            />
          )}
        </Form.Item>
        <Form.Item label="Body Shape" required>
          <Input
            value={newFish.body_shape}
            onChange={(e) => handleChange("body_shape", e.target.value)}
            status={errors.body_shape ? 'error' : ''}
          />
          {errors.body_shape && <div style={{ color: 'red' }}>{errors.body_shape}</div>}
        </Form.Item>
        <Form.Item label="Age" required>
          <InputNumber
            value={newFish.age}
            onChange={(value) => handleChange("age", value)}
            status={errors.age ? 'error' : ''}
          />
          {errors.age && <div style={{ color: 'red' }}>{errors.age}</div>}
        </Form.Item>
        <Form.Item label="Size" required>
          <InputNumber
            value={newFish.size}
            onChange={(value) => handleChange("size", value)}
            status={errors.size ? 'error' : ''}
          />
          {errors.size && <div style={{ color: 'red' }}>{errors.size}</div>}
        </Form.Item>
        <Form.Item label="Weight" required>
          <InputNumber
            value={newFish.weight}
            onChange={(value) => handleChange("weight", value)}
            status={errors.weight ? 'error' : ''}
          />
          {errors.weight && <div style={{ color: 'red' }}>{errors.weight}</div>}
        </Form.Item>
        <Form.Item label="Gender" required>
          <Input
            value={newFish.gender}
            onChange={(e) => handleChange("gender", e.target.value)}
            status={errors.gender ? 'error' : ''}
          />
          {errors.gender && <div style={{ color: 'red' }}>{errors.gender}</div>}
        </Form.Item>
        <Form.Item label="Breed" required>
          <Input
            value={newFish.breed}
            onChange={(e) => handleChange("breed", e.target.value)}
            status={errors.breed ? 'error' : ''}
          />
          {errors.breed && <div style={{ color: 'red' }}>{errors.breed}</div>}
        </Form.Item>
        <Form.Item label="Origin" required>
          <Input
            value={newFish.origin}
            onChange={(e) => handleChange("origin", e.target.value)}
            status={errors.origin ? 'error' : ''}
          />
          {errors.origin && <div style={{ color: 'red' }}>{errors.origin}</div>}
        </Form.Item>
        <Form.Item label="Selling Price" required>
          <InputNumber
            value={newFish.selling_price}
            onChange={(value) => handleChange("selling_price", value)}
            status={errors.selling_price ? 'error' : ''}
          />
          {errors.selling_price && <div style={{ color: 'red' }}>{errors.selling_price}</div>}
        </Form.Item>
        <Form.Item label="Pond ID" required>
          <InputNumber
            value={newFish.pond_id}
            onChange={(value) => handleChange("pond_id", value)}
            status={errors.pond_id ? 'error' : ''}
          />
          {errors.pond_id && <div style={{ color: 'red' }}>{errors.pond_id}</div>}
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default AddFish;