import React from 'react';
import { Modal, Input, message } from 'antd';

const AddProduct = ({ visible, onAdd, onClose, newProduct, setNewProduct }) => {
    const handleAdd = () => {
        // Check for required fields
        if (!newProduct.name || !newProduct.price || !newProduct.quantity || !newProduct.image) {
            message.warning('Please fill in all fields');
            return;
        }

        // Create the product object
        const productData = {
            name: newProduct.name,
            image: newProduct.image,
            description: newProduct.description,
            price: Number(newProduct.price),
            quantity: Number(newProduct.quantity),
        };

        // Call the onAdd function with the product data
        onAdd(productData);
    };

    return (
        <Modal
            title="Add Product"
            visible={visible}
            onCancel={onClose}
            onOk={handleAdd}
        >
            <Input
                name="name"
                placeholder="Name"
                value={newProduct.name}
                onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                style={{ marginBottom: '10px' }}
            />
            <Input
                name="image"
                placeholder="Image URL"
                value={newProduct.image}
                onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
                style={{ marginBottom: '10px' }}
            />
            <Input
                name="description"
                placeholder="Description"
                value={newProduct.description}
                onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                style={{ marginBottom: '10px' }}
            />
            <Input
                name="price"
                placeholder="Price"
                type="number"
                value={newProduct.price}
                onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                style={{ marginBottom: '10px' }}
            />
            <Input
                name="quantity"
                placeholder="Quantity"
                type="number"
                value={newProduct.quantity}
                onChange={(e) => setNewProduct({ ...newProduct, quantity: e.target.value })}
            />
        </Modal>
    );
};

export default AddProduct;