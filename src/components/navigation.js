import React from 'react';
import '../index.css';
import { Link } from 'react-router-dom';

function Navigation() {
    return (
        <div className='header'>
        <nav>
          <img src="test1.png"/>
          <div className="nav-links">
            <ul>
                    <Link to='/homepage'>
                <li><a href="">HOME</a></li>
                    </Link>
                <li><a href="">ABOUT</a></li>
                    <Link to='/login'>
                <li><a href="">LOGIN</a></li>
                    </Link>
            </ul>
          </div>
        </nav>
        <div>

        </div>
      </div>
    )
}

export default Navigation;