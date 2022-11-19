import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <header className="my-navbar">
      <Link to="/">
        <h1>Urdu Khana</h1>
      </Link>
      <nav>
        <Link to="/about-us">About</Link>
        <Link to="/programs">Programs</Link>
        <Link to="/get-involved">Get Involved</Link>
      </nav>
    </header>
  );
}

export default Navbar;
