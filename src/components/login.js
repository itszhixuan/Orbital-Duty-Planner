import React from 'react';
import Intro from '../components/Intro';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Profile from '../components/Profile';
import {auth} from '../Firebase_config';
import '../index.css';

function Login() {
    const [loggedIn, setLoggedIn] = useState(true);
    function handleLoggedIn() {
      setLoggedIn(!loggedIn);
    }
    
    return (
        <div className='header'>
        <nav>
          <img src="test1.png"/>
          <div className="nav-links">
            <ul>
                    <Link to='/homepage'>
                <li><a href="">HOME</a></li>
                    </Link>
                    <Link to='/about'>
                <li><a href="">ABOUT</a></li>
                    </Link>
                    <Link to='/login'>
                <li><a href="">LOGIN</a></li>
                    </Link>
            </ul>
          </div>
        </nav>
        <div className="text-box">
            {
            auth.currentUser
            ? <Profile user = {auth.currentUser} handleLoggedIn = {handleLoggedIn}/>
            : <Intro handleLoggedIn = {handleLoggedIn}/>
            }
        </div>
      </div>
    )
}

export default Login;