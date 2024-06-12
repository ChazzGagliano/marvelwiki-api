import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import Loading from "./Loading";
import { Link } from "react-router-dom";

const Profile = () => {
  const [user, setUser] = useState(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const data = await axios.get(`http://localhost:3030/user/profile`, {
        withCredentials: true,
      });
      setUser(data);
      console.log(data);
      setLoading(false);
    }
    fetchData();
  }, []);

  const handleUnlike = async (characterId, characterName, characterImage) => {
    await axios.post(
      `http://localhost:3030/user/character/unlike`,
      {
        characterId: characterId,
        characterName: characterName,
        characterImage: characterImage,
      },
      { withCredentials: true }
    );
    window.location.reload();
  };

  if (loading) {
    return <Loading />;
  } else {
    return (
      <div>
        <div>
          <h1>{user.data.user.username}</h1>
        </div>
        <h1 className="headline">Favorites</h1>
        <div>
          {user.data.user.characters.map((c) => {
            return (
              <div>
                <div></div>
                <Link to={`/characters/${c.characterId}`}>
                  {<img src={c.characterImage} className="img" />}
                </Link>
                <button
                  className="delete"
                  type="button"
                  onClick={() =>
                    handleUnlike(
                      c.characterId,
                      c.characterName,
                      c.characterImage
                    )
                  }
                >
                  <img
                    className="button"
                    src="https://www.svgrepo.com/show/21045/delete-button.svg"
                  />
                </button>
                <div className="headline">{c.characterName}</div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
};

export default Profile;
