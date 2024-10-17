import React from "react";


const Navigation = () => {

    return ( <nav className="navbar navbar-expand-lg navbar-light bg-white">
    <a className="navbar-brand" href="/">
        <img
        className="pool-logo"
        src="https://i.pinimg.com/originals/67/2e/c0/672ec07e8a6032ac926f2011cb29d3b1.png"
        >
        </img>
        </a>

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
          <a className="nav-link" href="/cart">
            Cart
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