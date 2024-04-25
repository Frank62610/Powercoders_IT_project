// frontend/index.js

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as RouterProvider, Route, Routes } from 'react-router-dom';
import App from './App';
import Register from './Register.js';
import reportWebVitals from './reportWebVitals';
// import Frontpage from './Frontpage.js';
import { Chart } from './stock chart/chart.js';
import { GenQuiz } from './Quiz/quiz.js';


<link href="https://fonts.googleapis.com/css2?family=Noto+Sans:wght@400;500;700&display=swap" rel="stylesheet"></link>

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider>
      <Routes>
      {/* Use Route components without Switch */}
        <Route exact path="/" element={<App />} />
        <Route path="/register" element={<Register />} />
        {/* <Route path="/frontpage" element={<Frontpage />} /> */}
        <Route path="/chart" element={<Chart />} />
        <Route path="/quiz" element={<GenQuiz />} />
      </Routes>
    </RouterProvider>
    
    {/* <Frontpage /> */}
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
