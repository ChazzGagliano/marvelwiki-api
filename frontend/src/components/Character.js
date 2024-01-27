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
            {character.name}
            </div>
        <div className="">
            {character.description}
        </div>
        <div className="">
          <img className="img" src={`${character.thumbnail.path}.${character.thumbnail.extension}`} />
        </div>
      </div>
    );
  }
};
export default Character;
