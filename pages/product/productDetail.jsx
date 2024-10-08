import { useParams } from 'react-router-dom';
import axios from 'axios';
import LayoutTemplate from '../../components/header-footer-template/LayoutTemplate';
import { useCart } from './cartContext';
import { useEffect, useState } from 'react';
import "./product.css"


const URL = 'https://66e9e19287e41760944afe0c.mockapi.io/Product';

const ProductDetail = () => {
    const { id } = useParams();
    const { addToCart } = useCart(); // Get addToCart from context
    const [product, setProduct] = useState(null);

    const getProductDetail = async () => {
        const res = await axios.get(`${URL}/${id}`);
        if (res.status === 200) {
            setProduct(res.data);
        }
    };

    useEffect(() => {
        getProductDetail();
    }, [id]);

    if (!product) {
        return <div>Loading...</div>;
    }

    const handleAddToCart = () => {
        addToCart(product);
        alert(`${product.name} has been added to your cart!`);
    };

    return (
        <LayoutTemplate>
            
            <div>
                <div className='container'>
                    <div className="hd-pd">
                        <h1 className='center'>Product Detail</h1>
                    </div>
                    <div className="row g-0 text-center">
                        <div className="col-6 ">
                            <div className='img-product'>
                                <img src={product.image} alt={product.name} style={{ width: '300px', height: '300px' }} />
                            </div>
                        </div>
                        <div className="col-sm-6 text-left">
                            <div className="clearfix">
                                <h3 className="product_title entry-title">{product.name}</h3>
                                <div >
                                    <p>Description: {product.description}</p>
                                    <p className="price">
                                        Price: ${product.price}
                                    </p>
                                    <button className="btn btn-danger my-cart-btn" onClick={handleAddToCart}>Add to Cart</button>

                                </div>
                                <div className="product_meta">
                                    <span className="posted_in">Category: <a
                                        href="https://koihealthandpondcare.co.uk/product-category/pond-equipment/" rel="tag">Pond
                                        Equipment</a></span>
                                    <div className="social_share_list_holder"><span>Share on: </span>
                                        <ul>
                                            <li className="facebook_share"><a title="Share on Facebook" href="#"><i className="fa fa-facebook"></i></a></li>
                                            <li className="twitter_share"><a href="#" title="Share on Twitter"><i className="fa fa-twitter"></i></a></li>
                                            <li className="google_share"><a href="#" title="Share on Google+"><i className="fa fa-google-plus"></i></a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </LayoutTemplate>
    );
};

export default ProductDetail;