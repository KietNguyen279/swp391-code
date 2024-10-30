import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, message } from 'antd';
import {
  fetchProducts as fetchProductsApi,
  addProduct as addProductApi,
  updateProduct as updateProductApi,
  deleteProduct as deleteProductApi,
} from '../../config/ApiProduct.jsx'; // Adjust the path as necessary

import AddProduct from './AddProduct.jsx';
import EditProduct from './EditProduct.jsx';

const { Column } = Table;

function ManageProduct() {
  const [products, setProducts] = useState([]);
  const [openEdit, setOpenEdit] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [newProduct, setNewProduct] = useState({
    id: '',
    name: '',
    image: '',
    description: '',
    price: '',
    quantity: '',
  });

  const role = localStorage.getItem("role"); // Get the user role from local storage

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const productsData = await fetchProductsApi();
        setProducts(productsData);
      } catch (error) {
        message.error('Error fetching products: ' + error.message);
      }
    };

    loadProducts();
  }, []);

  const handleClickOpenAdd = () => {
    setOpenAdd(true);
    setNewProduct({ id: '', name: '', image: '', description: '', price: '', quantity: '' });
  };

  const handleCloseAdd = () => {
    setOpenAdd(false);
  };

  const handleAdd = async (productToAdd) => {
    try {
      await addProductApi(productToAdd);
      message.success('Product added successfully');
      const updatedProducts = await fetchProductsApi();
      setProducts(updatedProducts);
      handleCloseAdd();
    } catch (error) {
      message.error('Error adding product: ' + error.message);
    }
  };

  const handleClickOpenEdit = (product) => {
    setCurrentProduct(product);
    setOpenEdit(true);
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
  };

  const handleUpdate = async (productToUpdate) => {
    try {
      await updateProductApi(currentProduct.id, productToUpdate);
      setProducts((prevProducts) =>
          prevProducts.map((product) =>
              product.id === currentProduct.id ? { ...product, ...productToUpdate } : product
          )
      );
      handleCloseEdit();
      message.success('Product updated successfully');
    } catch (error) {
      message.error('Error updating product: ' + error.message);
    }
  };

  const handleDelete = (id) => {
    Modal.confirm({
      title: 'Are you sure you want to delete this product?',
      content: 'This action cannot be undone.',
      okText: 'Delete',
      onOk: async () => {
        try {
          await deleteProductApi(id);
          setProducts((prevProducts) => prevProducts.filter((product) => product.id !== id));
          message.success('Product deleted successfully');
        } catch (error) {
          message.error('Error deleting product: ' + error.message);
        }
      },
    });
  };

  return (
      <div>
        {/* Render Add Product button only for SHOP role */}
        {role === "SHOP" && (
            <Button type="primary" onClick={handleClickOpenAdd}>
              Add Product
            </Button>
        )}

        <Table dataSource={products} rowKey="id" style={{ marginTop: '20px' }}>
          <Column title="ID" dataIndex="id" />
          <Column title="Name" dataIndex="name" />
          <Column title="Image" dataIndex="image" render={(text) => <img src={text} alt={text} style={{ width: 50 }} />} />
          <Column title="Description" dataIndex="description" />
          <Column title="Price" dataIndex="price" render={(text) => `$${text}`} />
          <Column title="Quantity" dataIndex="quantity" />
          {role === "SHOP" && (
          <Column
              title="Actions"
              render={(text, product) => (
                  <>
                    {/* Render Edit button only for SHOP role */}

                        <Button
                            type="primary"
                            onClick={() => handleClickOpenEdit(product)}
                            style={{ marginRight: '5px' }}
                        >
                          Edit
                        </Button>

                        <Button
                            type="danger"
                            onClick={() => handleDelete(product.id)}
                        >
                          Delete
                        </Button>

                  </>
              )}
          />
          )}
        </Table>

        <AddProduct
            visible={openAdd}
            onAdd={handleAdd}
            onClose={handleCloseAdd}
            newProduct={newProduct}
            setNewProduct={setNewProduct}
        />

        <EditProduct
            visible={openEdit}
            onUpdate={handleUpdate}
            onClose={handleCloseEdit}
            currentProduct={currentProduct}
            setCurrentProduct={setCurrentProduct}
        />
      </div>
  );
}

export default ManageProduct;