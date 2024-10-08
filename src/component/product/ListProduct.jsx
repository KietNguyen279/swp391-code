import { useState, useEffect } from 'react';
import "../../assets/css/style.css"
import "../../assets/css/bootstrap.css"
import axios from 'axios';
import { Link } from 'react-router-dom';

const URL = 'https://66e9e19287e41760944afe0c.mockapi.io/Product';

const ListProduct = () => {
	const [products, setProducts] = useState([]);


	const getListProduct = async () => {
		const res = await axios.get(`${URL}`);
		if (res.status === 200) {
			setProducts(res.data);
		}
	}

	useEffect(() => {
		getListProduct();
	}, []);


	return (

		<div>

			<div className="container py-xl-5 py-lg-3">
				<div>
					<h1 >Products</h1>
				</div>
				<div className="inner-sec">
					<div className="card-deck text-center row mt-5">

						{products.map(product => (
							<div className="col-md-3 text-center" key={product.id}>
								<Link to={`/productDetail/${product.id}`}>
									<img src="images/img_1.png" width="150px" height="150px" />
									<h2>{product.name}</h2>
									{/* <h2>{product.description}</h2> */}
									<br />
									<strong>Price: ${product.price}</strong>
									<br />
								</Link>
								<button className="btn btn-danger my-cart-btn">Add to Cart</button>
							</div>
						))}
					</div>
				</div>
			</div>

		</div>



	);
}

export default ListProduct;