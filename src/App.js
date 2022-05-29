//import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
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
    <div className="App">
      {/* <div className="App-header">
        <Header />
        <h2>Automatically create time-tables for you and your team!</h2>
      </div> */}

      <main>
        <div className="App-Intro">
          <h1>Welcome to Plan-it!</h1>
          <h1>Please log in, or sign up if this is your first time.</h1>
        {
          auth.currentUser
          ? <Profile user = {auth.currentUser} handleLoggedIn = {handleLoggedIn} />
          : <Intro handleLoggedIn = {handleLoggedIn} />
        }
        </div>
      </main>
    </div>
  );
}

export default App;
