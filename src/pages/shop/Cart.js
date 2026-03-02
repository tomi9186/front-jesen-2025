import { useContext } from "react";
import { Link } from "react-router";
import { CartContext } from "../../context/CartContext";

const Cart = () => {
  const { cart, setCart } = useContext(CartContext);

  const updateQuantity = (id, quantity) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }

    setCart(
      cart.map((item) =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  if (cart.length === 0) {
    return (
      <div className="container my-5">
        <h1 className="mb-4">Košarica</h1>
        <div className="alert alert-info">
          Vaša košarica je prazna.
          <Link to="/shop" className="alert-link ms-2">
            Nastavi sa kupovanjem
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container my-5">
      <h1 className="mb-4">Košarica</h1>

      <table className="table table-hover">
        <thead>
          <tr>
            <th></th>
            <th>Proizvod</th>
            <th>Cijena</th>
            <th>Količina</th>
            <th>Ukupno</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {cart.map((item) => (
            <tr key={item.id}>
              <td style={{ width: "80px" }}>
                {item.image && (
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{ width: "100%", height: "60px", objectFit: "cover" }}
                  />
                )}
              </td>
              <td>{item.name}</td>
              <td>${item.price.toFixed(2)}</td>
              <td>
                <input
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(e) =>
                    updateQuantity(item.id, parseInt(e.target.value))
                  }
                  className="form-control"
                  style={{ width: "70px" }}
                />
              </td>
              <td>${(item.price * item.quantity).toFixed(2)}</td>
              <td>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="btn btn-sm btn-danger"
                >
                  Ukloni
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="row my-4">
        <div className="col-md-6">
          <Link to="/shop" className="btn btn-secondary">
            Nastavi sa kupovanjem
          </Link>
        </div>
        <div className="col-md-6 text-end">
          <h3 className="mb-3">
            Ukupno: <strong>${totalPrice.toFixed(2)}</strong>
          </h3>
          <Link to="/checkout" className="btn btn-primary btn-lg">
            Nastavi do checkoutu
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;
