import { Link } from 'react-router-dom';
import "../assets/css/style.css"
import "../assets/css/bootstrap.css"

export default function Cart() {

    const products = [
        {
            id: 1,
            name: 'Unionbay Park',
            size: '10.5',
            color: 'Dark Blue',
            image: 'https://www.bootdey.com/image/220x180/FF0000/000000',
            quantity: 1,
            price: 43.90,
            discount: 18.00,
        },
        {
            id: 2,
            name: 'Daily Fabric Cap',
            size: 'XL',
            color: 'Black',
            image: 'https://www.bootdey.com/image/220x180/5F9EA0/000000',
            quantity: 2,
            price: 24.89,
            discount: 0,
        },
        {
            id: 3,
            name: 'Cole Haan Crossbody',
            size: '-',
            color: 'Turquoise',
            image: 'https://www.bootdey.com/image/220x180/9932CC/000000',
            quantity: 1,
            price: 200.00,
            discount: 0,
        }
    ];

    const subtotal = products.reduce((total, product) => total + (product.price * product.quantity), 0).toFixed(2);



    return (
        <div>
            <div className="container padding-bottom-3x mb-1">
                {/* Alert */}
                <div className="column">
                    <Link className="btn btn-outline-secondary" to="/product">
                        <i className="icon-arrow-left"></i>&nbsp;Back to Shopping
                    </Link>
                </div>
                {/* Shopping Cart */}
                <div className="table-responsive shopping-cart">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Product Name</th>
                                <th className="text-center">Quantity</th>
                                <th className="text-center">Subtotal</th>
                                <th className="text-center">
                                    <button className="btn btn-sm btn-outline-danger">Clear Cart</button>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product) => (
                                <tr key={product.id}>
                                    <td>
                                        <div className="product-item">
                                            <Link to="#"><img className="product-thumb" src={product.image} alt="Product" /></Link>
                                            <div className="product-info">
                                                <h4 className="product-title"><Link to="#">{product.name}</Link></h4>
                                                <span><em>Size:</em> {product.size}</span>
                                                <span><em>Color:</em> {product.color}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="text-center">
                                        <select className="form-control">
                                            {[...Array(5)].map((_, index) => (
                                                <option key={index} value={index + 1}>{index + 1}</option>
                                            ))}
                                        </select>
                                    </td>
                                    <td className="text-center text-lg text-medium">${(product.price * product.quantity)}</td>
                                    <td className="text-center"><button className="remove-from-cart"><i className="fa fa-trash">remove</i></button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="shopping-cart-footer">
                    <div className="column text-lg">Subtotal: <span className="text-medium">${subtotal}</span></div>
                </div>
                <div className="shopping-cart-footer">
                    <div className="column">
                        <Link className="btn btn-success" to="/product">Update Cart</Link>
                        <Link className="btn btn-success" to="/checkout">Checkout</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

