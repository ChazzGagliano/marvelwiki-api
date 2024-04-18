import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Character from "./components/Character";
import Comic from "./components/Comic"
import SearchCharacters from "./components/SearchCharacters";
import CharacterIndex from "./components/CharacterIndex"
import Storie from "./components/Storie"
import Event from "./components/Event"
import Signup from "./components/Signup"
import Login from "./components/Login"
import "bootstrap/dist/css/bootstrap.min.css";
import Navigation from "./components/Navigation.js";



function App() {
    return (
      <Router>
        <Navigation/>
        <div className="">
          <div className="">
            <Routes>
              <Route path="/" element={<SearchCharacters />} />
              <Route path="/characters/all" element={<CharacterIndex/>} />
              <Route path="/characters/:id" element={<Character />} />
              <Route path="/comic/:id" element={<Comic />} />
              <Route path="/storie/:id" element={<Storie />} />
              <Route path="/event/:id" element={<Event />} />
              <Route path="/signup" element={<Signup/>}/>
              <Route path="/login" element={<Login/>}/>
            </Routes>
          </div>
        </div>
      </Router>
    );
  }

export default App;
