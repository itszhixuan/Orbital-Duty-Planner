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
          <div className="App-Intro">
            <Navigation />
            <Routes>
              <Route path="/" element={<Homepage />}/>
              <Route path="/homepage" element={<Homepage />}/>
              <Route path="/login" element={<Login />}/>
            </Routes>
          </div>
        </main>
      </div>
    </Router>
  );
}

export default App;
