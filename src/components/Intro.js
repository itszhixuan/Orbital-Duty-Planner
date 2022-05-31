import {useState} from 'react';
import {createUserWithEmailAndPassword} from 'firebase/auth';
import { signInWithEmailAndPassword } from 'firebase/auth';
import {auth} from '../Firebase_config';
import '../index.css';

function Intro(props) {
    const [registerEmail, setRegisterEmail]  = useState("");
    const [registerPassword, setRegisterPassword]  = useState("");
    const [loginEmail, setLoginEmail]  = useState("");
    const [loginPassword, setLoginPassword]  = useState("");
    const handleLoggedIn = props.handleLoggedIn;

    const register = async () => {
        try {
            await createUserWithEmailAndPassword(auth, registerEmail, registerPassword);
            handleLoggedIn();
        } catch (error) {
            console.log(error.message);
        }
    }

    const login = async () => {
        try {
           await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
           handleLoggedIn();
        } catch (error) {
            console.log(error.message);
        }
    }
    return (
        <div className='login'>
         <h1>Sign-in to Plan-it!</h1>
        
{/*          <p id='intro'> Welcome!</p> */}
            <div className='div1'>
                <p>One of us? Log in here!</p> 
                <div>
                    <input className="enter-field"
                    type = 'email'
                    placeholder='Email...'
                    onChange={(event) => {
                        setLoginEmail(event.target.value);
                    }}
                    />
                </div>
                <div>
                    <input className="enter-field"
                    type = 'password'
                    placeholder='Password...'
                    onChange={(event) => {
                        setLoginPassword(event.target.value);
                    }}
                    />
                </div>
                <div>
                    <button onClick={login} className="learnmore-button" >Login</button>
                </div>
            </div>

            <div className='div2'>
                <p> New here? Sign up here!</p>
                <div>
                <input className="enter-field"
                type = 'email'
                placeholder='Email...' 
                onChange={(event) => {
                    setRegisterEmail(event.target.value);
                }}
                />
                </div>
                <div>
                <input className="enter-field"
                    type = 'password'
                    placeholder='Password...' 
                    onChange={(event) => {
                        setRegisterPassword(event.target.value);
                    }}
                />
                </div>
                <div>

                <button onClick={register} className="learnmore-button" >Register</button>
                </div>
            </div>
        </div>
    );
}

export default Intro;