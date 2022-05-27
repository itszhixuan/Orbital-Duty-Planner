//import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import Intro from './components/Intro';
import { useState } from 'react';

function App() {
  const [tasks, setTasks] = useState([]);
  return (
    <div className="App">
      <div className="App-header">
        <Header task = {tasks} />
        <h2>Automatically create time-tables for you and your team!</h2>
      </div>
      <div className="App-Intro">
        <h1>Welcome to Plan-it!</h1>
        <h1>Please log in, or sign up if this is your first time.</h1>
        <Intro/>
      </div>
    </div>
  );
}

export default App;
