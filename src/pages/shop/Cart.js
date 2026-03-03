import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Cart = () => {

    const [cart, setCart] = useState([]);

    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
        setCart(storedCart);
    }, []);

    const updateLocalStorage = (updatedCart) => {
        setCart(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    }

    const increaseQuantity = (id) => {
        const updatedCart = cart.map(item => 
            item.id === id 
            ? {...item, quantity: item.quantity + 1} 
            : item
        );
        updateLocalStorage(updatedCart);
    }

    const decreaseQuantity = (id) => {
        const updatedCart = cart.map(item => 
            item.id === id && item.quantity > 1
            ? {...item, quantity: item.quantity - 1} 
            : item
        );
        updateLocalStorage(updatedCart);
    }

    const removeItem = (id) => {
        const updatedCart = cart.filter(item => item.id !== id);
        updateLocalStorage(updatedCart);
    }

    const getTotalPrice = () => {
        return cart.reduce((total, item) => {
            return total + (item.price * item.quantity);
        }, 0).toFixed(2);
    }

    const handleOrder = () => {
        alert("Narudžba uspješna!");
        localStorage.removeItem('cart');
        setCart([]);
    }

    if(cart.length === 0){
        return(
            <div className="container mt-5">
                <h2>Košarica je prazna</h2>
                <Link to="/" className="btn btn-primary mt-3">
                    Nastavi kupovinu
                </Link>
            </div>
        )
    }

    return (
        <div className="container mt-5 pb-5">
            <h2>Checkout</h2>

            <table className="table table-bordered mt-4">
                <thead className="table-light">
                    <tr>
                        <th>Proizvod</th>
                        <th>Cijena</th>
                        <th>Količina</th>
                        <th>Ukupno</th>
                        <th>Akcija</th>
                    </tr>
                </thead>
                <tbody>
                    {cart.map(item => (
                        <tr key={item.id}>
                            <td>
                                <img 
                                    src={item.thumbnail} 
                                    alt={item.title}
                                    width="50"
                                    className="me-2"
                                />
                                {item.title}
                            </td>
                            <td>{item.price} EUR</td>
                            <td>
                                <div className="btn-group">
                                    <button 
                                        className="btn btn-secondary"
                                        onClick={() => decreaseQuantity(item.id)}
                                    >
                                        -
                                    </button>
                                    <span className="btn btn-light">
                                        {item.quantity}
                                    </span>
                                    <button 
                                        className="btn btn-secondary"
                                        onClick={() => increaseQuantity(item.id)}
                                    >
                                        +
                                    </button>
                                </div>
                            </td>
                            <td>
                                {(item.price * item.quantity).toFixed(2)} EUR
                            </td>
                            <td>
                                <button 
                                    className="btn btn-danger"
                                    onClick={() => removeItem(item.id)}
                                >
                                    Obriši
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="d-flex justify-content-between align-items-center mt-4">
                <h4>Ukupno: {getTotalPrice()} EUR</h4>
            </div>

            <div className="mt-4 d-flex justify-content-between">
                <Link to="/shop" className="btn btn-outline-primary">
                    Nastavi kupovinu
                </Link>

                <Link to="/checkout" className="btn btn-success">
                    Naruči
                </Link>
            </div>
        </div>
    )
}

export default Cart;