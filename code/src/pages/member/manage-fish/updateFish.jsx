import React, { useState, useEffect } from "react";
import {
  Modal,
  Button,
  Input,
  InputNumber,
  Typography,
  Form,
  Image,
  Upload,
} from "antd";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { UploadOutlined } from "@ant-design/icons";
import firebaseApp from "./firebase"; // Ensure your Firebase app is correctly configured and exported

const { Text } = Typography;

function UpdateFish({ open, onClose, fish, onUpdate, onDelete }) {
  const [updatedFish, setUpdatedFish] = useState(fish);
  const [imageFile, setImageFile] = useState(null);
  const [imageURL, setImageURL] = useState("");
  const [imageURLPREVIEW, setImageURLPREVIEW] = useState(false);

  useEffect(() => {
    if (fish) {
      setUpdatedFish(fish);
      setImageURL(fish.image); // Set initial image URL from fish prop
    }
  }, [fish]);

  const handleChange = (name, value) => {
    setUpdatedFish((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImageURL(URL.createObjectURL(file)); // Create a local URL for preview
    }
    setImageURLPREVIEW(true);
  };

  const handleUpdate = async () => {
    if (imageFile) {
      const storage = getStorage(firebaseApp);
      const storageRef = ref(storage, `fish_images/${imageFile.name}`);
      await uploadBytes(storageRef, imageFile);
      const url = await getDownloadURL(storageRef);
      updatedFish.image = url; // Update fish object with new image URL
    }

    console.log(updatedFish); // Log the updated fish object
    setImageURLPREVIEW(false);
    setImageFile(null);
    onUpdate(updatedFish);
    onClose();
  };

  const handleDelete = async () => {
    // Delete the fish image from Firebase Storage
    if (updatedFish.image) {
      const storage = getStorage(firebaseApp);
      const imageRef = ref(storage, updatedFish.image); // Use the image URL to get the reference
      await deleteObject(imageRef)
        .then(() => {
          console.log("Image deleted successfully.");
        })
        .catch((error) => {
          console.error("Error deleting image: ", error);
        });
    }

    onDelete(updatedFish.id); // Delete the fish record
    onClose();
  };

  return (
    <Modal
      title="Update Fish Details"
      visible={open}
      onCancel={onClose}
      footer={[
        <Button key="delete" type="danger" onClick={handleDelete}>
          Delete
        </Button>,
        <Button key="update" type="primary" onClick={handleUpdate}>
          Update Fish
        </Button>,
      ]}
    >
      {updatedFish && (
        <>
          <Text strong>Name: {updatedFish.name}</Text>
          <div>
            <strong style={{ display: "inline" }}>Image:</strong>
            <Image
              src={updatedFish.image}
              alt={updatedFish.image}
              width={100}
              height={100}
              preview={true}
            />
          </div>
          <div>
            <strong style={{ display: "inline-block" }}>
              Upload New Image:
            </strong>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              style={{ margin: "10px 0", display: "inline-block" }}
            />
            {imageURLPREVIEW && (
              <div>
                <Image src={imageURL} width={100} height={100} preview={true} />
              </div>
            )}
          </div>

          <Form layout="vertical">
            <Form.Item label="Pond ID">
              <InputNumber
                value={updatedFish.pond_id}
                onChange={(value) => handleChange("pond_id", value)}
              />
            </Form.Item>
            <Form.Item label="Age">
              <InputNumber
                value={updatedFish.age}
                onChange={(value) => handleChange("age", value)}
              />
            </Form.Item>
            <Form.Item label="Size">
              <InputNumber
                value={updatedFish.size}
                onChange={(value) => handleChange("size", value)}
              />
            </Form.Item>
            <Form.Item label="Weight">
              <InputNumber
                value={updatedFish.weight}
                onChange={(value) => handleChange("weight", value)}
              />
            </Form.Item>
            <Form.Item label="Body Shape">
              <Input
                value={updatedFish.body_shape}
                onChange={(e) => handleChange("body_shape", e.target.value)}
              />
            </Form.Item>
          </Form>

          <Text strong>Gender: {updatedFish.gender}</Text>
          <br />
          <Text strong>Breed: {updatedFish.breed}</Text>
          <br />
          <Text strong>Origin: {updatedFish.origin}</Text>
          <br />
          <Text strong>Selling Price: ${updatedFish.selling_price}</Text>
        </>
      )}
    </Modal>
  );
}

export default UpdateFish;
