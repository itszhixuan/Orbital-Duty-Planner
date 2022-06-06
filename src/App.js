//import logo from './logo.svg';
import './App.css';
import Navigation from './components/navigation';
import Login from './components/login';
import Homepage from './components/homepage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <main>
          <section className="App-Intro">
            <Navigation />
            <Routes>
              <Route path="/" element={<Homepage />}/>
              <Route path="/homepage" element={<Homepage />}/>
              <Route path="/login" element={<Login />}/>
            </Routes>
          </section>
          <section className="footer">
            <h1>Read more at: </h1>
            <div className="icons">
              <a target="_blank" href="https://github.com/itszhixuan/Orbital-Duty-Planner">
                <i class='fa fa-github fa-xl'></i>
              </a>
            </div>
          </section>
        </main>
      </div>
    </Router>
  );
}

export default App;
