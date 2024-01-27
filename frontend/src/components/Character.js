import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import Loading from "./Loading";
import { useParams } from "react-router-dom";

const Character = () => {
  const { id } = useParams();
  const [character, setCharacter] = useState(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const { data } = await axios.get(
        `http://localhost:3030/characters/${id}`
      );
      setCharacter(data);
      console.log(data);
      setLoading(false);
    }

    fetchData();
  }, [id]);
  
  if (loading) {
    return <Loading />;
  } else {
    return (
      <div className="">
        <div className="">
          <img
            className="img"
            src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
          />
        </div>
        <div className="">
          <h1>{character.name}</h1>
        </div>
        <div className="">{character.description}</div>
        <div>
            <h2>Comic Appearances</h2>
            {character.comics.items.map((mc) => {
                return <div>{mc.name}</div>
            })}
        </div>
        <div>
            <h2>Stories</h2>
          {character.stories.items.map((ma) => {
              return <div>{ma.name}</div>;
          })}
        </div>
      </div>
    );
  }
};
export default Character;
