import React, { useState } from "react";
import axios from "axios"

const Signup = () => {
  const [userName, setuserName] = useState("");
  const [passWord, setpassWord] = useState("")


  const handleSubmit = async (event) => {
    event.preventDefault();
    await axios.post("http://localhost:3030/user/register", {
       username: userName,
       password: passWord
    })
  };

  return (
    <div id="signup">
      <h1>Signup</h1>
      <form onSubmit={handleSubmit}>
        <div>
          Username: <input name="username" type="text" value={userName} onChange={(event) => {setuserName(event.target.value)}} />
        </div>
        <div>
          Password: <input name="password" type="password" value={passWord} onChange={(event) => {setpassWord(event.target.value)}} />
        </div>
        <button type="submit">Signup</button>
      </form>
    </div>
  );

}

export default Signup