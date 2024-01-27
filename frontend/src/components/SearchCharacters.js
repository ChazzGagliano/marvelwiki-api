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
   <h1>Welcome</h1>
   <Link to={`/characters/all`}>
   <img className="home_img" src="https://thetruecolors.org/wp-content/uploads/2021/02/marvel-logo-header-1.jpg"/> 
   </Link>
    </div>
      <button onClick={handleSubmitCharacter}>search:</button>
      <input
        type="text"
        onChange={(e) => setCharacter(e.target.value)}
        value={character}
      />
      {term.length > 0 && (
        <div>
          {term.map((c) => {
            return <div>
             <Link to={`/characters/${c.id}`}>
            <div>
             {c.name}
            </div>
            </Link>
                </div>;
          })}
        </div>
      )}
      </div>
  );
}
