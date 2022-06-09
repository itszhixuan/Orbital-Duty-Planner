import React from 'react';
import '../index.css';
import { Link } from 'react-router-dom';

function About() {

    return (
        <div>
            <div className="sub-header">
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
                <h1>About Us</h1>
            </div>

            <div className='about-content'>
                <div className='row'>
                    <div className='about-col-1'>
                        <h1>Our goal</h1>
                    </div>
                    <div className='about-col-2'>
                        <p>
                            Have you ever experienced the difficulty of creating a schedule for an organisation/club that fully integrates the demands, preferences and availability of each employee/member? 
                        </p>
                        <p>
                            Many of the planners would spend hours just to cater to everyone’s availability while having to fulfil their organisation's requirements, such as having a minimum number of shifts per month. 
                        </p>
                        <p>
                            As the number of employees/members increase, the task at hand gets exponentially harder.
                        </p>
                        <p>
                            At Plan-it!, we provide a platform for organisations to automatically and optimally plan and schedule duties and shift work based on preferences given by members of the organisation.
                        </p>
                    </div>
                </div>
            </div>

        </div>
    )
}
export default About;