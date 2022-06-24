import React from 'react';
import '../index.css';
import { Link } from 'react-router-dom';

function Homepage() {

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
        <div>
        <div class="text-box">
            <h1>Welcome to Plan-it!</h1>
            <p>Here, we will solve your scheduling issues by creating timetables for you and your team!</p>
            <Link to='/about'>
              <a href="" class="learnmore-button">Click here to learn more!</a>
            </Link>
        </div>
        </div>
      </div>
    )
}
export default Homepage;