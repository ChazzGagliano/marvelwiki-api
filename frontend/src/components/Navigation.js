import React from "react";
import axios from "axios"

const Navigation = () => {
    const handleClick = async (event) => {
        event.preventDefault();
        await axios.get(`http://localhost:3030/user/logout`, {
            withCredentials: true
          });
        window.location.href = "/profile";
    };

    return ( <nav className="navbar navbar-expand-lg navbar-light bg-white">
    <a className="navbar-brand" href="/">
      Home
    </a>
    <button
      className="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarNavDropdown"
      aria-controls="navbarNavDropdown"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span className="navbar-toggler-icon"></span>
    </button>

    <div className="collapse navbar-collapse" id="navbarNavDropdown">
      <ul className="navbar-nav">
        <li className="nav-item active">
          
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/login">
            Login
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/signup">
           Sign up
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/profile">
            Profile
          </a>
        </li>
        <li className="nav-item">
        <a className="nav-link" href="#" onClick={handleClick}>
      Logout
    </a>
        </li>
        <li className="nav-item dropdown">
          <div
            className="dropdown-menu"
            aria-labelledby="navbarDropdownMenuLink"
          >
            <a className="dropdown-item" href="#">
              Action
            </a>
            <a className="dropdown-item" href="#">
              Another action
            </a>
            <a className="dropdown-item" href="#">
              Something else here
            </a>
          </div>
        </li>
      </ul>
    </div>
  </nav>)
}
export default Navigation