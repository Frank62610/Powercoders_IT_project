// frontend/App.js
import React, { useState } from 'react';
// import axios from 'axios';
import { Link } from 'react-router-dom';
import './App.css';
// import jwtDecode from 'jwt-decode';

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  // const history = useNavigate();


  const handleLogin = async () => {
    try {
      console.log(`User not found or incorrect credentials`);
      const response = await fetch('http://localhost:3000/api/v1/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username,
          password
        })
      });

      const data = await response.json();
      console.log(data)
      if (response.ok) {
        // localStorage.setItem('token', data.token);
        window.location.href = 'http://localhost:8080/frontpage';
      // } else if (response.status === 404) {
      } else if (data.error){
        setMessage(data.error);
      }
        
    
    } catch (error) {
      console.error('Error:', error);
    }
  };


  // const handleLogin = async () => {
    
  //   try {
  //     console.log(username, "123123123", password)
  //     const response = await axios.post('http://localhost:8080/login', {
  //       username,
  //       password
  //     });

  //     const data = response.data;
  //     setMessage(data.message);

  //     if (response.status === 200) {
  //       localStorage.setItem('token', data.token);
  //       history('/frontpage');
  //     } else if (response.status === 404) {
  //       console.log("User not found or incorrect credentials")
  //       setMessage("User not found or incorrect credentials"); // Update the message state with the error message
  //     } 
  //   } catch (error) {
  //     console.error('Error:', error);
  //   }
  // };

  return (
    <main>
      <div><h3>{message}</h3></div>
      <form className="input-group">
        <label htmlFor="Username">Username:</label><br />
        <input
          type="text"
          id="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        /><br />
        <label htmlFor="Password">Password:</label><br />
        <input
          type="password"
          id="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        /><br /><br />
        <button id="submit_button" type="button" onClick={handleLogin}>Login</button>
      </form>
      <section className="register">
        {/* Add a link to the registration page */}
        <a href="http://localhost:3000/register">Without an Account? Go register</a>
      </section>
    </main>
  );
}

export default App;
