import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <header>
      <nav className="my-navbar">
        <Link className="logo" to="/">
          <h1>گفتگو</h1>
        </Link>
        <div className="nav-links">
          <Link to="/about-us">About</Link>
          <Link to="/programs">Programs</Link>
          <Link to="/get-involved">Get Involved</Link>
          <button>Sign Up</button>
          <button>Login</button>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
