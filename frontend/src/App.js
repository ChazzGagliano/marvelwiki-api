import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Character from "./components/Character";
import Comic from "./components/Comic"
import SearchCharacters from "./components/SearchCharacters";
import CharacterIndex from "./components/CharacterIndex"




function App() {
    return (
      <Router>
        <div className="">
          <div className="">
            <Routes>
              <Route path="/characters/all" element={<CharacterIndex/>} />
              <Route path="/characters/:id" element={<Character />} />
              <Route path="characters" element={<SearchCharacters />} />
              <Route path="/comic/:id" element={<Comic />} />
            </Routes>
          </div>
        </div>
      </Router>
    );
  }

export default App;
