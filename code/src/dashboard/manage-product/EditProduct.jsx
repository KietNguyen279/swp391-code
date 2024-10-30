import React from 'react';
import { Modal, Input, message } from 'antd';

const EditProduct = ({ visible, onUpdate, onClose, currentProduct, setCurrentProduct }) => {
    const handleUpdate = () => {
        // Check for required fields
        if (!currentProduct.name || !currentProduct.price || !currentProduct.quantity || !currentProduct.image) {
            message.warning('Please fill in all fields');
            return;
        }

        // Prepare the product data
        const updatedProduct = {
            name: currentProduct.name,
            image: currentProduct.image,  // Include the image field
            description: currentProduct.description,
            price: Number(currentProduct.price),
            quantity: Number(currentProduct.quantity),
        };

        // Call the onUpdate function with the updated product data
        onUpdate(updatedProduct);
    };

    return (
        <Modal
            title="Edit Product"
            visible={visible}
            onCancel={onClose}
            onOk={handleUpdate}
            okText="Update"
        >
            {currentProduct && (
                <>
                    <Input
                        name="name"
                        placeholder="Name"
                        value={currentProduct.name}
                        onChange={(e) => setCurrentProduct({ ...currentProduct, name: e.target.value })}
                        style={{ marginBottom: '10px' }}
                    />
                    <Input
                        name="image"
                        placeholder="Image URL"
                        value={currentProduct.image}
                        onChange={(e) => setCurrentProduct({ ...currentProduct, image: e.target.value })}
                        style={{ marginBottom: '10px' }}
                    />
                    <Input
                        name="description"
                        placeholder="Description"
                        value={currentProduct.description}
                        onChange={(e) => setCurrentProduct({ ...currentProduct, description: e.target.value })}
                        style={{ marginBottom: '10px' }}
                    />
                    <Input
                        name="price"
                        placeholder="Price"
                        type="number"
                        value={currentProduct.price}
                        onChange={(e) => setCurrentProduct({ ...currentProduct, price: e.target.value })}
                        style={{ marginBottom: '10px' }}
                    />
                    <Input
                        name="quantity"
                        placeholder="Quantity"
                        type="number"
                        value={currentProduct.quantity}
                        onChange={(e) => setCurrentProduct({ ...currentProduct, quantity: e.target.value })}
                    />
                </>
            )}
        </Modal>
    );
};

export default EditProduct;