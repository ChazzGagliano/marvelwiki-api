import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import Loading from "./Loading";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const Character = () => {
  const { id } = useParams();
  const [character, setCharacter] = useState(undefined);
  const [loading, setLoading] = useState(true);

  const handleLike = async (characterId, characterName, characterImage) => {
    await axios.post(
      `http://localhost:3030/user/character/like`,
      {
        characterId: characterId,
        characterName: characterName,
        characterImage: characterImage,
      },
      { withCredentials: true }
    );
  };

  useEffect(() => {
    async function fetchData() {
      const { data } = await axios.get(
        `http://localhost:3030/characters/${id}`
      );
      setCharacter(data[0]);
      console.log(data);
      setLoading(false);
    }
    fetchData();
  }, [id]);

  if (loading) {
    return <Loading />;
  } else {
    return (
      <div className="description">
        <div className="">
          <div className="move_over">
            <div>

            <img
              className="thumbnail"
              src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
              />
              </div>
            <div>
              <div>
                <button
                  className="favorite"
                  type="button"
                  onClick={() =>
                    handleLike(
                      character.id,
                      character.name,
                      `${character.thumbnail.path}.${character.thumbnail.extension}`
                    )
                  }
                >
                  <img
                    className="button"
                    src="https://icons.iconarchive.com/icons/hopstarter/soft-scraps/256/Button-Favorite-icon.png"
                  />
                </button>
              </div>
            </div>
          </div>

          <div className="">
            <h1>{character.name}</h1>
            <h3>Total Comics: {character.comics.available}</h3>
          </div>
          <div className="">{character.description}</div>
          <div>
            <h2>Comic Appearances</h2>
            {character.comics.items.map((mc) => {
              return (
                <div>
                  <div className="">
                    <Link
                      to={`/comic/${mc.resourceURI.split("/")[6]}`}
                      className="linkage"
                    >
                      {" "}
                      {mc.name}
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
          <div>
            <h2>Stories</h2>
            {character.stories.items.map((ma) => {
              return (
                <div>
                  <div>
                    <Link
                      to={`/storie/${ma.resourceURI.split("/")[6]}`}
                      className="linkage"
                    >
                      {" "}
                      {ma.name}
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
          <div>
            <h2>Events</h2>
            {character.events.items.map((me) => {
              return (
                <div>
                  <div>
                    <Link
                      to={`/event/${me.resourceURI.split("/")[6]}`}
                      className="linkage"
                    >
                      {" "}
                      {me.name}
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
};
export default Character;
