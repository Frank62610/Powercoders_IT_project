import React from 'react'
import logo from './images/Logo.jpg'
import chat from './images/chat.png'
import air from './images/Air Jordan.jpg'
import './Frontpage.css'

const Frontpage = () => {
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
                <h2>All apps in one site</h2>
                <p> Welcome to this site, you can see my profolio, check stock chart, play games, and do shopping. Enjoy!</p>
            </article>
            <img src={air} alt='123' />
        </section>
    </main>
  )
}

export default Frontpage