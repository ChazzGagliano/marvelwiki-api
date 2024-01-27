import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function SearchCharacters() {
  const [character, setCharacter] = useState("");
  const [term, searchTerm] = useState([]);
 

  const handleSubmitCharacter = async (e) => {
    e.preventDefault();

    if (character === "") {
      return;
    }

    const { data } = await axios.get(
      `http://localhost:3030/characters/search/${character}`
    );
    searchTerm(data);
    console.log(data);
  };

  return (
    <div>
      <div>
        <h1 className="welcome">Welcome</h1>
        <div>
        <Link to={`/characters/all`}>
          <img
            className="home_img"
            src="https://thetruecolors.org/wp-content/uploads/2021/02/marvel-logo-header-1.jpg"
            />
        </Link>
            </div>
      </div>
      <input className="search-bar"
        type="text"
        onChange={(e) => setCharacter(e.target.value)}
        value={character}
      />
      <button className="button_search" onClick={handleSubmitCharacter}>search</button>
      {term.length > 0 && (
        <div>
          {term.map((c) => {
            return (
              <div>
                <Link to={`/characters/${c.id}`} className="linkage">
                  <div>{c.name}</div>
                  <img
            className="img"
            src={`${c.thumbnail.path}.${c.thumbnail.extension}`}
          />
                </Link>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
