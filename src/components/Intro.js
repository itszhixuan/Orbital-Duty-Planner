import {useState} from 'react';
import Header from './Header';
import {createUserWithEmailAndPassword} from 'firebase/auth';
import {auth} from '../Firebase_config';


function Intro(props) {
    const [registerEmail, setRegisterEmail]  = useState("");
    const [registerPassword, setRegisterPassword]  = useState("");
    const [loginEmail, setLoginEmail]  = useState("");
    const [loginPassword, setLoginPassword]  = useState("");

    const register = async () => {
        try {
            const user = await createUserWithEmailAndPassword(auth, registerEmail, registerPassword);
        } catch (error) {
            console.log(error.message);
        }
    }
    return (
        <div>
            <p id='intro'> Welcome!</p>
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

            <button onClick={register}>Register</button>
        </div>
    );
}

export default Intro;