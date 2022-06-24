//import logo from './logo.svg';
import './App.css';
import Login from './components/login';
import Homepage from './components/homepage';
import About from './components/about';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div>
        <main>
          <section>
            <Routes>
              <Route path="/" element={<Homepage />}/>
              <Route path="/homepage" element={<Homepage />}/>
              <Route path="/login" element={<Login />}/>
              <Route path="/about" element={<About />}/>
            </Routes>
          </section>
          <section className="footer">
            <h1>Read more of our project from</h1>
            <div className="icons">
              <a target="_blank" href="https://github.com/itszhixuan/Orbital-Duty-Planner">
                <i class='fa fa-github fa-xl'></i>
              </a>
              <a target="_blank" href="https://drive.google.com/drive/folders/1t_zFMXHs81GbIwcQBO5vI9cJWbHl_PjB?usp=sharing">
                <i class='fa fa-google fa-xl'></i>
              </a>
            </div>
            <p>Brought to you by AI-5 &emsp; NUS Orbital 2022</p>
          </section>
        </main>
      </div>
    </Router>
  );
}

export default App;
