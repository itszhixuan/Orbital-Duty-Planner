//import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import Navbar from './components/Navbar';
import Intro from './components/Intro';
import { useState } from 'react';

function App() {
  const [tasks, setTasks] = useState([]);
  return (
    <div>
      <Header task = {tasks} />
      <main>
        <Navbar items = {tasks} setItems = {setTasks} />
        <div>
          <Intro />
        </div>
      </main>
    </div>
  );
}

export default App;
