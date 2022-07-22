import {useState} from 'react';
import {createUserWithEmailAndPassword} from 'firebase/auth';
import { signInWithEmailAndPassword } from 'firebase/auth';
import {auth} from '../Firebase_config';
import '../index.css';
import { toHaveStyle } from '@testing-library/jest-dom/dist/matchers';

function Intro(props) {
    const [registerEmail, setRegisterEmail]  = useState("");
    const [registerPassword, setRegisterPassword]  = useState("");
    const [loginEmail, setLoginEmail]  = useState("");
    const [loginPassword, setLoginPassword]  = useState("");
    const handleLoggedIn = props.handleLoggedIn;
    const [error, SetError] = useState(null);
    const [error2, SetError2] = useState(null);

    const register = async () => {
        try {
            await createUserWithEmailAndPassword(auth, registerEmail, registerPassword);
            handleLoggedIn();
        } catch (error) {
            if (error.code === "auth/email-already-in-use"){
                SetError("Sorry, the current email is already in use. Did you mean to log in instead?");
            }
            else if (error.code === "auth/weak-password"){
                SetError("Sorry, the password should be at least 6 characters.");
            }
            else if (error.code === "auth/invalid-email"){
                SetError("Sorry, the email entered is in an invalid format.");
            }
            else if (error.code === "auth/internal-error"){
                SetError("The password field has not been filled.");
            }
            else if (error.code === "auth/missing-email"){
                SetError("The email field has not been filled.");
            }
            else {
                SetError(error.message);
                console.log(error.message);
            }
        }
    }

    const login = async () => {
        try {
           await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
           handleLoggedIn();
        } catch (error2) {
            if (error2.code === "auth/user-not-found"){
                SetError2("Sorry, the email entered is not found. Did you mean to sign up instead?");
            }
            else if (error2.code === "auth/wrong-password"){
                SetError2("Sorry, the password entered is incorrect.");
            }
            else if (error2.code === "auth/too-many-requests"){
                SetError2("Sorry, access to this account has been temporarily disabled due to numerous failed login attempts. Please try again later.");
            }
            else if (error2.code === "auth/internal-error"){
                SetError2("The password field has not been filled.");
            }
            else if (error2.code === "auth/invalid-email"){
                SetError2("Sorry, the email entered is in an invalid format.");
            }
            else {
                SetError2(error2.message);
                console.log(error2.message);
            }
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
                { error2 && <p>{ error2 }</p> }
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
                { error && <p>{ error }</p> }
                <div>

                <button onClick={register} className="learnmore-button" >Register</button>
                </div>
            </div>
        </div>
    );
}

export default Intro;