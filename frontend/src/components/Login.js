import React, { useState } from "react";
import axios from "axios"
import { Link } from "react-router-dom";

const Login = () => {
  const [userName, setuserName] = useState("");
  const [passWord, setpassWord] = useState("")
  const [login, setLogin] = useState(false)


  const handleLogin = async (e) => {
    e.preventDefault();
    await axios.get("http://localhost:3030/user/login", {
       username: userName,
       password: passWord
    })
    if (userName == user.username && passWord === user.password)  {
        setLogin(true)
    }
  };

  return (
    <div id="signup">
      <Link to={"/"}>
        <h3 className="welcome">Home</h3>
      </Link>
      <h1 className="welcome">Login</h1>
      <form onSubmit={handleLogin}>
        <div className="">
        <div>
          Username: <input name="username" type="text" value={userName} onChange={(event) => {setuserName(event.target.value)}} />
        </div>
        <div>
          Password: <input name="password" type="password" value={passWord} onChange={(event) => {setpassWord(event.target.value)}} />
        </div>
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );

}

export default Login