import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import LayoutTemplate from '../../components/header-footer-template/LayoutTemplate';
import { useDispatch } from 'react-redux';
import { message, Button, Card, Row, Col, Typography } from "antd";
import { addProduct } from '../../redux/features/cartSlice';
import { fetchProductById } from '../../config/ApiProduct'; // Import the new function

const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch(); // Use dispatch from Redux
  const [product, setProduct] = useState(null);
  const role = localStorage.getItem("role");

  const getProductDetail = async () => {
    try {
      const fetchedProduct = await fetchProductById(id); // Fetch the product by ID
      setProduct(fetchedProduct);
    } catch (error) {
      console.error("Failed to fetch product details:", error);
    }
  };

  useEffect(() => {
    getProductDetail();
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  const handleAddToCart = () => {
    dispatch(addProduct(product)); // Dispatch the product to Redux
    message.success(`${product.name} has been added to your cart!`);
  };

  const handleLogBuy = () => {
    message.error(`Login to add product to cart.`);
  };

  return (
      <LayoutTemplate>
        <div className='container'>
          <h1 className='center'>Product Detail</h1>
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Card
                  cover={<img alt={product.name} src={product.image} style={{ width: '100%', height: 'auto' }} />}
              />
            </Col>
            <Col span={12}>
              <Card>
                <Typography.Title level={3}>{product.name}</Typography.Title>
                <Typography.Paragraph>
                  <strong>Description:</strong> {product.description}
                </Typography.Paragraph>
                <Typography.Title level={4}>Price: ${product.price}</Typography.Title>
                {role === "MEMBER" || role === "SHOP" || role === "ADMIN" ? (
                        <Button type="primary" onClick={handleAddToCart}>
                          Add to Cart
                        </Button>

                ):(
                    <Button type="primary" onClick={handleLogBuy}>
                      Add to Cart
                    </Button>
                )}
                {/*<Button type="primary" onClick={handleAddToCart}>*/}
                {/*  Add to Cart*/}
                {/*</Button>*/}
                <div style={{ marginTop: 16 }}>
                  <Typography.Text>Category: </Typography.Text>
                  <a href="https://koihealthandpondcare.co.uk/product-category/pond-equipment/" rel="tag">Pond Equipment</a>
                </div>
              </Card>
            </Col>
          </Row>
        </div>
      </LayoutTemplate>
  );
};

export default ProductDetail;