import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import Loading from "./Loading";
import { Link } from "react-router-dom";

const Profile = () => {
  const [user, setUser] = useState(null);
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

    if (user === null) {
        fetchData()
    }

  }, [user]);

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

  const handleDeleteAccount = async () => {
    try {
      await axios.delete('http://localhost:3030/user/delete-account', {
        withCredentials: true
      });
      window.location.href = "/"; 
    } catch (error) {
      console.error('Error deleting account:', error);
    }
  };

  if (loading) {
    return <Loading />;
  } else {
      if (user === null) {
          return (
              <div>
                  "New? Sign up?"
              </div>
          )
      }
      return (
          <div>
        <div>
          <h1>{user.data.user.username}</h1>
        </div>
        <h1 className="headline">Favorites</h1>
        <button
        className="delete-account-button"
        type="button"
        onClick={handleDeleteAccount} // Use onClick instead of onChange
      >
                    Delete Account
                </button>
        <div>
          {user.data.user.characters.map((c) => {
            return (
              <div>
                <div>

                <Link to={`/characters/${c.characterId}`}>
                  {<img src={c.characterImage} className="img" />}
                </Link>
                </div>
                <div className="headline">
                    {c.characterName}
                </div>
                <div>
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
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
};

export default Profile;
