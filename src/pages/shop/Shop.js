import { useState, useContext, useEffect } from "react";
import { Link } from "react-router";
import { CartContext } from "../../context/CartContext";

const Shop = () => {
  const { cart, setCart } = useContext(CartContext);
  const [showMessage, setShowMessage] = useState(false);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://dummyjson.com/products");
        const data = await response.json();
        setProducts(data.products);
        setLoading(false);
      } catch (error) {
        console.log("Greška pri dohvaćanju proizvoda:", error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const addToCart = (product) => {
    const existingProduct = cart.find((item) => item.id === product.id);
    const productToAdd = {
      id: product.id,
      name: product.title || product.name,
      price: product.price,
      description: product.description,
      image: product.images && product.images[0] ? product.images[0] : null,
      quantity: 1,
    };

    if (existingProduct) {
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...productToAdd, quantity: 1 }]);
    }

    setShowMessage(true);
    setTimeout(() => setShowMessage(false), 2000);
  };

  return (
    <div className="container my-5">
      <h1 className="mb-5">Shop</h1>

      {showMessage && (
        <div className="alert alert-success alert-dismissible fade show">
          Proizvod dodan u košaricu!
        </div>
      )}

      {loading ? (
        <div className="text-center">
          <p>Učitavanje proizvoda...</p>
        </div>
      ) : (
        <>
          <div className="row g-4">
            {products.map((product) => (
              <div key={product.id} className="col-md-4">
                <div className="card h-100">
                  {product.images && product.images[0] && (
                    <img
                      src={product.images[0]}
                      className="card-img-top"
                      alt={product.title}
                      style={{ height: "250px", objectFit: "cover" }}
                    />
                  )}
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title">{product.title}</h5>
                    <p className="card-text text-muted">{product.description}</p>
                    <p className="card-text fw-bold mt-auto">
                      ${product.price.toFixed(2)}
                    </p>
                    <button
                      onClick={() => addToCart(product)}
                      className="btn btn-primary"
                    >
                      Dodaj u košaricu
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-5">
            <Link to="/cart" className="btn btn-secondary">
              Vidi košaricu ({cart.length})
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default Shop;
