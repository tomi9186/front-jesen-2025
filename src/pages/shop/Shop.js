import {useState, useEffect} from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";

const Shop = () => {

    const[products, setProducts] = useState([]);
    
    useEffect(() => {
        const fetchPage = async() => {
          try{
            const response = await fetch('https://dummyjson.com/products');
            if(!response.ok){
              throw new Error('Ne mogu povući podatke');
            }
            const data = await response.json();
            setProducts(data.products);
          } catch (err) {
            console.log(err.message);
          }
        }
        fetchPage();
    }, []);

    const addToCart = (product) => {
        // Čitaj postojeću košaricu iz localStorage-a
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        
        // Provjeri je li proizvod već u košarici
        const existingProduct = cart.find(item => item.id === product.id);
        
        if (existingProduct) {
            // Ako postoji, povećaj količinu
            existingProduct.quantity = (existingProduct.quantity || 1) + 1;
        } else {
            // Ako ne postoji, dodaj proizvod s količinom 1
            product.quantity = 1;
            cart.push(product);
        }
        
        // Spremi ažuriranu košaricu u localStorage
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    if(!products) return <p>Učitavanje...</p>;

    return (
        <div className="container">
            <h1>Shop</h1>
            <div className="row">
            { products.map(product => (
                <div className="col-md-4" key={product.id}>
                    <img src={product.images[0]} alt={product.title} />
                    <h3 key={product.id}>{product.title}</h3>
                    <button className="btn btn-success" onClick={() => addToCart(product)}>
                         {product.price} EUR
                         <FontAwesomeIcon icon={faCartPlus} className="pt-1 ms-2" />
                    </button>
                </div>
            )) }
            </div>
        </div>
    )
}

export default Shop;