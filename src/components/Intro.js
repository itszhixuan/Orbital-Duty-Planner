import {useState} from 'react';
import {createUserWithEmailAndPassword} from 'firebase/auth';
import { signInWithEmailAndPassword } from 'firebase/auth';
import {auth} from '../Firebase_config';


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
        <div>
            <h1>Please log in, or sign up if this is your first time.</h1>
            <div>
            <input 
            type = 'email'
            placeholder='Email...' 
            onChange={(event) => {
                setRegisterEmail(event.target.value);
            }}
            />
            <input 
                type = 'password'
                placeholder='Password...' 
                onChange={(event) => {
                    setRegisterPassword(event.target.value);
                }}
            />

            <button onClick={register} >Register</button>
            </div>
            <div>
                <input 
                type = 'email'
                placeholder='Email...'
                onChange={(event) => {
                    setLoginEmail(event.target.value);
                }}
                />
                <input 
                type = 'password'
                placeholder='Password...'
                onChange={(event) => {
                    setLoginPassword(event.target.value);
                }}
                />

                <button onClick={login}>Login</button>
            </div>
        </div>
    );
}

export default Intro;