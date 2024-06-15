import React, { useState } from "react";
import axios from "axios"
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom"

const Signup = () => {
  const [userName, setuserName] = useState("");
  const [passWord, setpassWord] = useState("")
  const navigate = useNavigate()


  const handleSubmit = async (event) => {
    event.preventDefault();
    await axios.post("http://localhost:3030/user/register", {
       username: userName,
       password: passWord
    })
    navigate(`/login`)
  };

  return (
    <div id="signup">
      <h1 className="welcome">Signup</h1>
      <form onSubmit={handleSubmit}>
        <div className="welcome">
        <div>
          Username: <input name="username" type="text" value={userName} onChange={(event) => {setuserName(event.target.value)}} />
        </div>
        <div>
          Password: <input name="password" type="password" value={passWord} onChange={(event) => {setpassWord(event.target.value)}} />
        </div>
        </div>
        <button type="submit">Signup</button>
      </form>
    </div>
  );

}

export default Signup