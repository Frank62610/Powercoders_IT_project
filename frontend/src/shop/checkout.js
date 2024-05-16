import React, { useState, useEffect } from 'react';
import './checkout.css';
const images = require.context('./images', true);

export function Checkout() {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
    let totalCost = 0;
    let rendering = [];

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/v1/products', {
                    method: 'GET',
                    // body: JSON.stringify()
                });
    
                const data = await response.json();
                setProducts(data);
            } catch (error) {
                console.error('Error:', error);
            }
        };
    
        fetchData();
    }, []);

    // Load cart data from localStorage on component mount
    useEffect(() => {
        const storedCart = localStorage.getItem('cart');
        if (storedCart) {
            setCart(JSON.parse(storedCart));
        }
    }, []);

    console.log(cart)
    console.log(products)

    function deleteCart(id){
        const newArray = cart.filter(item => item.id !== id);
        setCart(newArray)
    }

    // Calculate total cost and create rendering
    for (const element of cart) {
        for (const product of products) {
            if (element.id === product.id) {
                rendering.push(
                    <section className='productSection'>
                        <img className="product-image" src={images(product.image)} alt={product.name} />    
                        <p key={product.id}>
                            Order number: <strong>{element.num}</strong> <hr></hr>
                            Product Name: <strong>{product.name}</strong>  <br></br>
                            price: <strong>USD${product.priceCents * element.num / 100}</strong>
                        </p>
                        <button className='deletePackage' onClick={() => {deleteCart(element.id)}}>
                            Delete
                        </button>
                    </section>
                );
                totalCost += product.priceCents * element.num;
            }
        }
    }

    console.log("rendering", rendering)

    return (
        <main className='checkout'>
            <h2>Checkout</h2>
            {rendering}
            <h4>Total cost: USD${totalCost / 100}</h4>
        </main>
    );
}

export default Checkout;