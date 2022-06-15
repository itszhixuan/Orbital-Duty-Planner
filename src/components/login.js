import React from 'react';
import Intro from '../components/Intro';
import { useState } from 'react';
import Profile from '../components/Profile';
import {auth} from '../Firebase_config';
import '../index.css';

function Login() {
    const [loggedIn, setLoggedIn] = useState(true);
    function handleLoggedIn() {
      setLoggedIn(!loggedIn);
    }
    
    return (
        <div className="text-box">
            {
            auth.currentUser
            ? <Profile user = {auth.currentUser} handleLoggedIn = {handleLoggedIn}/>
            : <Intro handleLoggedIn = {handleLoggedIn}/>
            }
        </div>
    )
}

export default Login;