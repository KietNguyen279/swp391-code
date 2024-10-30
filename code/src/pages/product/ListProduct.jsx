import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import LayoutTemplate from "../../components/header-footer-template/LayoutTemplate";
import { addProduct } from "../../redux/features/cartSlice";
import {Button, Card, Row, Col, message} from "antd"; // Import Row and Col from antd
import { fetchProducts as fetchProductsApi } from '../../config/ApiProduct.jsx';


function ListProduct() {
  const [products, setProducts] = useState([]);
    const getListProduct = async () => {
        try {
            const data = await fetchProductsApi();
            setProducts(data);
        } catch (error) {
            console.error("Failed to fetch products:", error);
        }
    };

    useEffect(() => {
        getListProduct();
    }, []);



  return (
      <LayoutTemplate>
          <div className="container py-xl-5 py-lg-3">
              <h1 className="center">Products</h1>
              <Row gutter={[16, 16]}>
                {products.map((product) => (
                    <Product key={product.id} product={product} />
                ))}
              </Row>
          </div>
      </LayoutTemplate>
  );
}

const Product = ({ product }) => {
  const dispatch = useDispatch();
  const role = localStorage.getItem("role");

    

    const handleLogBuy = () => {
        message.error(`Login to add product to cart.`);
    };

  const handleAddToCart = () => {
    dispatch(addProduct(product));
    message.success(`${product.name} has been added to your cart!`);
  };
  return (
      <Col span={8} > {/* Adjust span for layout */}
          <Card
              hoverable
              cover={<img alt={product.name} src={product.image} />}
          >
              <Card.Meta
                  title={
                      <Link to={`/productDetail/${product.id}`} style={{ textDecoration: "none", color: "black" }}>
                          {product.name}
                      </Link>
                  }
                  description={
                      <>
                          <div>Description: {product.description}</div>
                          <div>Price: ${product.price}</div>
                      </>
                  }
              />
              {role === "MEMBER" || role === "SHOP" || role === "ADMIN" ? (
                  <Button type="primary" onClick={handleAddToCart}>
                      Add to Cart
                  </Button>

              ):(
                  <Button type="primary" onClick={handleLogBuy}>
                      Add to Cart
                  </Button>
              )}
              {/*<Button*/}
              {/*    type="primary"*/}
              {/*    onClick={handleAddToCart}*/}
              {/*    style={{ marginTop: 16 }}*/}
              {/*>*/}
              {/*    Add to Cart*/}
              {/*</Button>*/}
          </Card>
      </Col>
  );
};

export default ListProduct;
