import React, {useState} from 'react';
import '../index.css';
import { Link } from 'react-router-dom';

function Homepage() {

  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

    return (
        <div className='header'>
        <nav>
          <img src="test1.png"/>
          <div /* className="nav-links"  */className={sidebar ? 'nav-links active' : 'nav-links'}>
            <i class="fa fa-close" onClick={showSidebar}></i>
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
            <i class="fa fa-list" onClick={showSidebar}></i>

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