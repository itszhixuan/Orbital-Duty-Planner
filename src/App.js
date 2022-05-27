//import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import Navbar from './components/Navbar';
import Intro from './components/Intro';
import { useState } from 'react';
import Profile from './components/Profile';
import {auth} from './Firebase_config';

function App() {
  const [loggedIn, setLoggedIn] = useState(true);
  function handleLoggedIn() {
    setLoggedIn(!loggedIn);
  }

  return (
    <div>
      <Header />
      <main>
        <div>
        {
          auth.currentUser
          ? <Profile user = {auth.currentUser} />
          : <Intro handleLoggedIn = {handleLoggedIn}/>
        }
        </div>
      </main>
    </div>
  );
}

export default App;
