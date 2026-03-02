import { useState, useContext } from "react";
import { useNavigate } from "react-router";
import { CartContext } from "../../context/CartContext";

const Checkout = () => {
  const navigate = useNavigate();
  const { cart, setCart } = useContext(CartContext);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);

    // Simulacija obrade narudžbe
    setTimeout(() => {
      setCart([]);
      alert("Narudžba je uspješno obrađena!");
      navigate("/");
    }, 1500);
  };

  if (cart.length === 0) {
    return (
      <div className="container my-5">
        <div className="alert alert-warning">
          Nema proizvoda u košarici. Vrati se u <a href="/shop">shop</a>.
        </div>
      </div>
    );
  }

  return (
    <div className="container my-5">
      <h1 className="mb-4">Checkout</h1>

      <div className="row">
        <div className="col-md-6 mb-4">
          <h3 className="mb-3">Podaci za dostavu</h3>
          {submitted && (
            <div className="alert alert-success">
              Obrađujem vašu narudžbu...
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Ime</label>
              <input
                type="text"
                className="form-control"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Prezime</label>
              <input
                type="text"
                className="form-control"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Telefon</label>
              <input
                type="tel"
                className="form-control"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Adresa</label>
              <input
                type="text"
                className="form-control"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Grad</label>
              <input
                type="text"
                className="form-control"
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Poštanski broj</label>
              <input
                type="text"
                className="form-control"
                name="postalCode"
                value={formData.postalCode}
                onChange={handleChange}
                required
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary btn-lg w-100"
              disabled={submitted}
            >
              {submitted ? "Obrada..." : "Završi narudžbu"}
            </button>
          </form>
        </div>

        <div className="col-md-6">
          <h3 className="mb-3">Pregled narudžbe</h3>

          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Proizvodi</h5>

              <table className="table table-sm">
                <tbody>
                  {cart.map((item) => (
                    <tr key={item.id}>
                      <td style={{ width: "60px" }}>
                        {item.image && (
                          <img
                            src={item.image}
                            alt={item.name}
                            style={{
                              width: "100%",
                              height: "50px",
                              objectFit: "cover",
                            }}
                          />
                        )}
                      </td>
                      <td>{item.name}</td>
                      <td className="text-end">
                        x{item.quantity} = ${(item.price * item.quantity).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <hr />

              <div className="d-flex justify-content-between align-items-center">
                <h5>Ukupna cijena:</h5>
                <h5 className="fw-bold">${totalPrice.toFixed(2)}</h5>
              </div>
            </div>
          </div>

          <a href="/cart" className="btn btn-secondary mt-3 w-100">
            Vrati se na košaricu
          </a>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
