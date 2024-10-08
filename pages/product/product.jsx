import { useState, useEffect } from 'react';
import "../../assets/css/bootstrap.css";
import "./product.css"
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import LayoutTemplate from '../../components/header-footer-template/LayoutTemplate';
import { useCart } from './cartContext';




const URL = 'https://66e9e19287e41760944afe0c.mockapi.io/Product';

const ListProduct = () => {
	const navigate = useNavigate();
	const { addToCart } = useCart(); // Get addToCart from context
	const [products, setProducts] = useState([]);

	const getListProduct = async () => {
		const res = await axios.get(URL);
		if (res.status === 200) {
			setProducts(res.data);
		}
	};

	useEffect(() => {
		getListProduct();
	}, []);

	const handleAddToCart = (product) => {
		addToCart(product); // Call addToCart when the button is clicked
		alert(`${product.name} has been added to your cart!`);
	};

	return (
		<LayoutTemplate>
			<div className="container py-xl-5 py-lg-3">
				<h1 className='center'>Products</h1>
				<div className="inner-sec">
					<div className="card-deck text-center row mt-5">
						{products.map(product => (
							<div className="col-md-3 text-center" key={product.id}>
								<Link style={{textDecoration:'none', color:'black'}} to={`/productDetail/${product.id}`}>
									<div>
										<img src={product.image} width="150px" height="150px" alt={product.name} />
										<h2>{product.name}</h2>
										<strong>Price: ${product.price}</strong>
									</div>
								</Link>
								<button className="btn btn-danger my-cart-btn" onClick={() => handleAddToCart(product)}>
									Add to Cart
								</button>
							</div>
							

						))}
					</div>
				</div>
			</div>
		</LayoutTemplate>
	);
}

export default ListProduct;