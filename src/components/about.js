import React from 'react';
import '../index.css';
import { Link } from 'react-router-dom';

function About() {

    return (
        <div class="sub-header">
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
        <div /* className='text-box' */>
            <h1>About Us</h1>
        </div>
        </div>
    )
}
export default About;