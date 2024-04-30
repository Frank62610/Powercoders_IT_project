import React, { useState, useEffect } from 'react';
import './shop.css';
const images = require.context('./images', true);

export function Shop() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/v1/products', {
                    method: 'GET',
                    // body: JSON.stringify()
                });
    
                const data = await response.json();
                setProducts(data);
                console.log(products);
            } catch (error) {
                console.error('Error:', error);
            }
        };
    
        fetchData();
    }, []);
    

    // const handleLogin = async () => {
    //     try {
    //         const response = await fetch('http://localhost:8080/api/v1/products', {
    //             method: 'GET',
    //             // body: JSON.stringify()
    //         });

    //         const data = await response.json();
    //         setProducts(data);
    //         console.log(data);
    //     } catch (error) {
    //         console.error('Error:', error);
    //     }
    // };

    async function handleSearch(input){
        const params = {"rating": input}
        console.log(params)
        const url = `http://localhost:8080/api/v1/products?${new URLSearchParams(params).toString()}`
        try {
            // Make a GET request to the backend
            const response = await fetch(url);
            const data = await response.json();
            
            // Handle the response from the backend
            console.log(data);
            setProducts(data);
        } catch (error) {
            // Handle any errors
            console.error('Error fetching data:', error);
        }
    }

    function handleToggle(e) {
        e.preventDefault()
        const rating = document.querySelector('.search-bar').value
        handleSearch(rating)
    }


    return (
        <main>
            <section>
                <div className="header-middle-section">
                    <input className="search-bar" type="text" placeholder="Sort by input the rating score"/>

                    <button className="search-button" onClick={handleToggle}>
                    <img className="search-icon" src={images(`./icons/search-icon.png`)}  alt="search-icon"/>
                    </button>
                </div>
            </section>
            <div className='products-grid'>
                {products.map(product => (
                    <div key={product.id} className="product-container">
                        <div className="product-image-container">
                            <img className="product-image" src={images(product.image)} alt={product.name} />
                        </div>
                        <div className="product-name limit-text-to-2-lines">
                            {product.name}
                        </div>
                        <div className="product-rating-container">
                            <img className="product-rating-stars" 
                                src={images(`./ratings/rating-${product.stars * 10}.png`)} 
                                alt={product.id} />
                            <div className="product-rating-count link-primary">
                                {product.count}
                            </div>
                        </div>
                        <div className="product-price">
                            ${product.priceCents / 100}
                        </div>
                        <div className="product-quantity-container">
                            <select>
                                <option selected value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                                <option value="7">7</option>
                                <option value="8">8</option>
                                <option value="9">9</option>
                                <option value="10">10</option>
                            </select>
                        </div>
                        <div className="product-spacer"></div>
                        <div className="added-to-cart">
                            <img src={images('./icons/checkmark.png')} alt="Added" />
                            Added
                        </div>
                        <button className="add-to-cart-button button-primary js-add-to-cart" data-product-id={product.id}>
                            Add to Cart
                        </button>
                    </div>
                ))}
            </div>
        </main>
    );
}

export default Shop;
