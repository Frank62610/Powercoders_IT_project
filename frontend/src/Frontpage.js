import React from 'react'
import logo from './images/Logo.jpg'
import chat from './images/chat.png'
import air from './images/Air Jordan.jpg'
import './Frontpage.css'
import { jwtDecode } from 'jwt-decode';

const Frontpage = () => {

  const token = localStorage.getItem('token');

//   function parseJwt(token) {
//     var base64Url = token.split('.')[1];
//     var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
//     var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
//         return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
//     }).join(''));

//     return JSON.parse(jsonPayload);
// }

  // const decodedToken = parseJwt(token);

  const decodedToken = jwtDecode(token);
  const userRole = decodedToken.username;

  return (
    <main>
        <nav>
            <a href="/"><img src={logo} alt="Frank" /></a>
            <li>PROFOLIO</li>
            <li>STOCK</li>
            <li>GAME</li>
            <li>SHOPPING</li>
            <img src={chat} alt="icon" />
            
        </nav>
        <section>
            <article>
                <h2>Hello '{userRole}' <br/> This is one site for All apps</h2>
                <p> Welcome to this site, you can see my profolio, check stock chart, play games, and do shopping. Enjoy!</p>
            </article>
            <img src={air} alt='123' />
        </section>
    </main>
  )
}

export default Frontpage