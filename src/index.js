import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
//import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <div className="header">
      <nav>
        <img src="test1.png"/>
        <div className="nav-links">
          <ul>
            <li><a href="">HOME</a></li>
            <li><a href="">ABOUT</a></li>
            <li><a href="">LOGIN</a></li>
          </ul>
        </div>
      </nav>
    </div>

    <div className="text-box">
        <h1>Welcome to Plan-it!</h1>
        <p>Here, we will solve your scheduling issues by creating timetables for you and your team!</p>
    </div>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
