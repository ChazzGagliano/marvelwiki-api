import React, { useState } from "react";
import axios from "axios"
import { Link } from "react-router-dom";


const Login = () => {
  const [userName, setuserName] = useState("");
  const [passWord, setpassWord] = useState("")
//   const [login, setLogin] = useState(false)


  const handleLogin = async (e) => {
    e.preventDefault();
    const response = await axios.post("http://localhost:3030/user/login", {
       userName: userName,
       passWord: passWord
    }, {withCredentials: true})

    console.log(response)
    
    if (response.data.auth) {
        window.location.href = "/"
    }
    
  };

  return (
    <div id="signup">
      <Link to={"/"}>
        <h3 className="welcome">Home</h3>
      </Link>
      <h1 className="welcome">Login</h1>
      <form onSubmit={handleLogin}>
        <div className="welcome">
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