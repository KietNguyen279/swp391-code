import LayoutTemplate from '../../components/header-footer-template/LayoutTemplate';
import { useCart } from './cartContext';

const Cart = () => {
    const { cart, removeFromCart, clearCart } = useCart();
    const totalAmount = cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);

    return (
        <LayoutTemplate>
            <div className="container py-xl-5 py-lg-3">
                <h1 className='center'>Shopping Cart</h1>
                {cart.length === 0 ? (
                    <p className='center'>Your cart is empty.</p>
                ) : (
                    <div>
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th>Product</th>
                                    <th>Price</th>
                                    <th>Quantity</th>
                                    <th>Total</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cart.map((item) => (
                                    <tr key={item.id}>
                                        <td>{item.name}</td>
                                        <td>${item.price.toFixed(2)}</td>
                                        <td>{item.quantity}</td>
                                        <td>${(item.price * item.quantity).toFixed(2)}</td>
                                        <td>
                                            <button 
                                                className="btn btn-danger btn-sm" 
                                                onClick={() => removeFromCart(item.id)}
                                            >
                                                Remove
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <h3>Total: ${totalAmount}</h3>
                        <button className="btn btn-primary" onClick={clearCart}>Clear Cart</button>
                    </div>
                )}
            </div>
        </LayoutTemplate>
    );
};

export default Cart;