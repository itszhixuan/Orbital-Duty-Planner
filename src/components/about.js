import React, {useState} from 'react';
import '../index.css';
import { Link } from 'react-router-dom';

function About() {

    const [sidebar, setSidebar] = useState(false);

    const showSidebar = () => setSidebar(!sidebar);

    return (
        <div>
            <div className="sub-header">
                <nav>
                    <img src="test1.png"/>
                    <div className={sidebar ? 'nav-links-about active' : 'nav-links-about'}>
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
                <h1>About Us</h1>
            </div>
            <div className="outer">
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

            <div className="outer">
            <div className="about-features">
                <h1>Our Features</h1>
                <div className="row">
                    <div className="abtfeatures">
                        <h3>Hassle-free creation of events</h3>
                        <p>All you need to do is to create an event, select the restrictions and conditions that you desire and wait for your participants to respond!</p>
                    </div>
                    <div className="abtfeatures">
                        <h3>Automatic schedule generator</h3>
                        <p>Once all the inputs are in, a schedule catered to the availability of your participants can be generated with just one click of a button!</p>
                    </div>
                    <div className="abtfeatures">
                        <h3>Swapping shifts</h3>
                        <p>After the schedule is published, any internal shift swaps between your participants can be easily recorded by the organisation!</p>
                    </div>
                </div>
            </div>
            </div>
        </div>
    )
}
export default About;