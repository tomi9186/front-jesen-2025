import { useState, useEffect } from "react";
import emailjs from "@emailjs/browser";

const Checkout = () => {

    const [cart, setCart] = useState([]);
    const [orderSent, setOrderSent] = useState(false);
    const [loading, setLoading] = useState(false);
    const [orderId, setOrderId] = useState("");

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        postal: ""
    });

    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
        setCart(storedCart);
    }, []);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const isFormValid = () => {
        return Object.values(formData).every(value => value.trim() !== "");
    };

    const getTotalPrice = () => {
        return cart.reduce((total, item) => {
            return total + (item.price * item.quantity);
        }, 0).toFixed(2);
    };

    const generateOrderId = () => {
        return "ORD-" + Math.floor(100000 + Math.random() * 900000);
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        if(!isFormValid()){
            alert("Molimo ispunite sva polja!");
            return;
        }

        setLoading(true);

        const newOrderId = generateOrderId();
        setOrderId(newOrderId);

        const templateParams = {
            order_id: newOrderId,
            email: formData.email,
            customer_name: formData.name,

            orders: cart.map(item => ({
                name: item.title,
                units: item.quantity,
                price: (item.price * item.quantity).toFixed(2),
                image_url: item.thumbnail
            })),

            cost: {
                shipping: "0.00",
                tax: "0.00",
                total: getTotalPrice()
            }
        };

        try {

            await emailjs.send(
                "service_x0ibv9n",
                "template_9myrh84",
                templateParams,
                "UtWB2MoCq2a9Guv0x"
            );

            localStorage.removeItem("cart");
            setOrderSent(true);
            setCart([]);

        } catch (error) {
            alert("Greška pri slanju narudžbe!");
        }

        setLoading(false);
    };

    if(orderSent){
        return(
            <div className="container mt-5 text-center">
                <div className="card p-5 shadow">
                    <h2 className="text-success mb-3">
                        ✅ Narudžba uspješno poslana!
                    </h2>
                    <h4>ID narudžbe:</h4>
                    <h3 className="fw-bold">{orderId}</h3>
                </div>
            </div>
        )
    }

    return (
        <div className="container mt-5 pb-5">

            <div className="row">

                <div className="col-md-7">
                    <div className="card shadow p-4">

                        <h4 className="mb-4">Podaci za dostavu</h4>

                        <form onSubmit={handleSubmit}>

                            <input 
                                type="text"
                                name="name"
                                placeholder="Ime i prezime"
                                className="form-control mb-3"
                                onChange={handleChange}
                            />

                            <input 
                                type="email"
                                name="email"
                                placeholder="Email"
                                className="form-control mb-3"
                                onChange={handleChange}
                            />

                            <input 
                                type="text"
                                name="phone"
                                placeholder="Telefon"
                                className="form-control mb-3"
                                onChange={handleChange}
                            />

                            <input 
                                type="text"
                                name="address"
                                placeholder="Adresa"
                                className="form-control mb-3"
                                onChange={handleChange}
                            />

                            <input 
                                type="text"
                                name="city"
                                placeholder="Grad"
                                className="form-control mb-3"
                                onChange={handleChange}
                            />

                            <input 
                                type="text"
                                name="postal"
                                placeholder="Poštanski broj"
                                className="form-control mb-4"
                                onChange={handleChange}
                            />

                            <button 
                                className="btn btn-success w-100"
                                disabled={!isFormValid() || loading}
                            >
                                {loading ? "Slanje..." : "Završi narudžbu"}
                            </button>

                        </form>

                    </div>
                </div>

                <div className="col-md-5">
                    <div className="card shadow p-4">

                        <h4 className="mb-4">Pregled narudžbe</h4>

                        {cart.map(item => (
                            <div 
                                key={item.id}
                                className="d-flex justify-content-between border-bottom py-2"
                            >
                                <span>
                                    {item.title} x {item.quantity}
                                </span>
                                <span>
                                    {(item.price * item.quantity).toFixed(2)} €
                                </span>
                            </div>
                        ))}

                        <hr />

                        <h5 className="d-flex justify-content-between">
                            <span>Ukupno:</span>
                            <span>{getTotalPrice()} €</span>
                        </h5>

                    </div>
                </div>

            </div>

        </div>
    )
}

export default Checkout;