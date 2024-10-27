import React, { useEffect, useState } from "react";
import LayoutTemplate from "../../components/header-footer-template/LayoutTemplate";
import api from "../../config/axios";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { addProduct } from "../../redux/features/cartSlice";
import { Button } from "antd";

function ListProduct() {
  const [products, setProducts] = useState([]);
  const fetchProducts = async () => {
    try {
      const response = await api("product");
      setProducts(response.data);
    } catch (error) {
      toast.error("Error fetch products", error);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      <LayoutTemplate>
        <div className="products row" style={{ padding: "120px" }}>
          {products.map((product) => (
            <Product key={product.id} product={product} />
          ))}
        </div>
      </LayoutTemplate>
    </div>
  );
}

const Product = ({ product }) => {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addProduct(product));
  };
  return (
    <div className="product col-md-3">
      <img src={product.image} alt={product.name} />
      <h3>{product.name}</h3>
      <p>{product.description}</p>
      <span>{product.price}</span>
      <center>
        <Button onClick={handleAddToCart}>Add to cart</Button>
      </center>
    </div>
  );
};

export default ListProduct;
