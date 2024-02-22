import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import Loading from "./Loading";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";


const CharacterIndex = () => {
  const [characters, setCharacters] = useState(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const { data } = await axios.get(`http://localhost:3030/characters/all`);
      setCharacters(data);
      console.log(data);
      setLoading(false);
    }
    fetchData();
  }, []);

  if (loading) {
    return <Loading />;
  } else {
    return (
      <div>
        {characters.map((p) => {
          return (
            <div key={p.id}>
              <Link to={`/characters/${p.resourceURI.split("/")[6]}`}
                        className="linkage">
                {
                  <img
                    className="img"
                    src={`${p.thumbnail.path}.${p.thumbnail.extension}`}
                  />
                }
              </Link>
              <div>{p.name}</div>
              <div>{p.description}</div>
            </div>
          );
        })}
      </div>
    );
  }
};

export default CharacterIndex;
