import React, { useState, useEffect } from 'react';
import './shop.css';
import {jwtDecode } from 'jwt-decode';
import { FaStar } from 'react-icons/fa'
const images = require.context('./images', true);


export function Shop() {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
    const [popup, setPopup] = useState('');
    const [rating, setRating] = useState(null)
    const [hover, setHover] = useState(null)
    const [reviews, setReviews] = useState([])
    const [comment, setComment] = useState('');




    const handleOpenPopup = (id) => {
        setPopup(id);
        checkReviews(id)
    }
    const handleClosePopup = () => {
        setPopup('')
    }

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
    

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

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

    let jwt = document.cookie;
    const decodedToken = jwtDecode(jwt);
    let username = decodedToken.username


    async function checkReviews(id){
        const params = {"id": id}
        console.log("params:", params)
        const url = `http://localhost:8080/api/v1/reviews?${new URLSearchParams(params).toString()}`
        console.log("url:", url)
        try {
            const response = await fetch(url);
            const data = await response.json();
            console.log("data",data);
            setReviews(data)
        } catch (error) {
            // Handle any errors
            console.error('Error fetching reviews:', error);
        }
    }

    async function sendReviews(id, username, stars, review){
        try {
            const response = await fetch('http://localhost:8080/api/v1/reviews', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id,
                    username,
                    stars,
                    review
                })
            })
            const data = await response.json();
            console.log("input review data response:", data)
            checkReviews(id);
        }
        catch (error) {
            console.error('Error:', error);
          }
    }


    


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


    function handleAddToCart(e, id){
        e.preventDefault()
        const selectElement = e.target.parentElement.querySelector('.selected-value');
        const num = selectElement.value;
        console.log(num);
        console.log(id)
        !cart ? setCart([{ id, num }]):
        setCart(prevCart => [
            ...prevCart,
            { id, num }
        ]);
    }

    function numOfOrders(){
        return cart.reduce((total, element) => {
            total += Number(element.num)
            return total
        }, 0)
    }


    return (
        <main>
            <section className="shop-header">
                <span className="header-username">Hello {username}</span>
                <div className="header-middle-section">
                    <input className="search-bar" type="text" placeholder="Sort by input the rating score"/>

                    <button className="search-button" onClick={handleToggle}>
                    <img className="search-icon" src={images(`./icons/search-icon.png`)}  alt="search-icon"/>
                    </button>
                </div>
                <a className="cart-link" href="http://localhost:3000/checkout">
                    <img className="cart-icon" src={images(`./icons/cart-icon.png`)} alt="cart" />
                    <div className="cart-quantity">{numOfOrders()}</div>
                    
                </a>
            </section>
            <div className='products-grid'>
                {products.map(product => (
                    <div key={product.id} className="product-container">
                        <div className="product-image-container">
                            <img className="product-image" src={images(product.image)} 
                                alt={product.name} onClick={() => handleOpenPopup(product.id)}/>
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
                        <div >
                            <select className="selected-value">
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
                        <button className="add-to-cart-button button-primary js-add-to-cart" 
                            data-product-id={product.id} onClick={(event) => handleAddToCart(event, product.id)}>
                            Add to Cart
                        </button>
                        {popup === product.id && 
                        <div className='popupMain' onClick={handleClosePopup}>
                            <div className='popup'            
                                onClick={(e) => {
                                     e.stopPropagation();
                                  }}>
                                <img className="popup-image" src={images(product.image)} alt={product.name}/>
                                <article className='popup-content'>
                                    <h4>Users' Review</h4>
                                    {reviews.length > 0 ? 
                                        reviews.map((review, index) => <p key={index}>  {review.username}: {review.review} <br></br> rating:{Math.floor(review.stars)}/5</p> )
                                     : <p>No reviews so far</p>}
                                    <form className="reviewForm" onSubmit={(e) => {
                                        e.preventDefault();
                                        sendReviews(product.id, username, rating, comment);
                                        
                                    }}>
                                        <label htmlFor="comment">Leave Comments</label>
                                        <input
                                            type='text'
                                            id='comment'
                                            required
                                            placeholder='input your review for the product'
                                            value={comment}
                                            onChange={(e) => setComment(e.target.value)}
                                        />
                                        <button type="submit">Submit</button>
                                    </form>
                                </article>
                                <h3 width="100%">{product.name}</h3>
                                <p className="popup-rating">Your rating is: {rating}/5</p>
                                {[...Array(5)].map((star, index) => {
                                    const currentRating = index + 1;
                                    return (
                                        <label className='ratingInput' key={index}>
                                            <input type='radio' name='rating' value={currentRating} 
                                                onClick={() => setRating(currentRating)}/>
                                            <FaStar className="stars" size={40} 
                                                color={currentRating <= (hover || rating) ? "#ffc106" : "#e4e5e8"}  
                                                onMouseEnter={() => setHover(currentRating)}
                                                onMouseLeave={() => setHover(null)}
                                                />
                                        </label>
                                    )
                                })
                                }

                            </div>
                        </div> 
                        }
                    </div>
                ))}
            </div>
        </main>
    );
}

export default Shop;
