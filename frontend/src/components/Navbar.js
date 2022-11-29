import React, { useState, useContext } from "react";
import Modal from "react-modal";
import { UserContext } from "../UserContext";
import { Link } from "react-router-dom";

const customStyles = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.75)",
  },
  content: {
    backgroundColor: "white",
    display: "flex",
    flexDirection: "column",
    width: "20em",
    maxHeight: "60vh",
    margin: "0 auto",
    padding: "20px",
    border: "none",
    borderRadius: "10px",
  },
};

Modal.setAppElement("#root");

function Navbar() {
  const [renderLogin, setRenderLogin] = useState();
  const [modalIsOpen, setModalOpen] = useState(false);
  const { user, setUser } = useContext(UserContext);
  const [loginInfo, setLoginInfo] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setLoginInfo({
      name: "",
      username: "",
      email: "",
      password: "",
    });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setLoginInfo({ ...loginInfo, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const type = e.target.id.split("-")[0];

    try {
      fetch(`http://localhost:3009/${type}`, {
        method: "POST",
        body: JSON.stringify({ ...loginInfo }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((res) => {
          if (res.created || res.loggedIn) {
            setUser(res);
            closeModal();
          } else {
            window.location.reload();
          }
        });
    } catch (error) {}
  };

  const handleLogout = () => {
    setUser(null);
  };
  return (
    <header>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        {renderLogin ? (
          <>
            <h2>Log In</h2>
            <form
              className="register-form"
              id="signin-form"
              onSubmit={handleSubmit}
            >
              <input
                type="email"
                name={"email"}
                placeholder={"Email"}
                id={"email"}
                onChange={handleChange}
                value={loginInfo.email}
              />
              <input
                type="password"
                name={"password"}
                placeholder={"Password"}
                id={"password"}
                onChange={handleChange}
                value={loginInfo.password}
              />
              <button>Login</button>
            </form>
            <p style={{ marginTop: "auto" }}>
              New to Guftugu?{" "}
              <button
                onClick={() => {
                  setRenderLogin(false);
                }}
              >
                Sign up!
              </button>
            </p>
          </>
        ) : (
          <>
            <h2>Register</h2>
            <p>
              By continuing, you agree are setting up a Guftugu account and
              agree to our User Agreement and Privacy Policy.
            </p>
            <form
              className="register-form"
              id="register-form"
              onSubmit={handleSubmit}
            >
              <input
                type="text"
                name={"name"}
                placeholder={"Name"}
                id={"name"}
                onChange={handleChange}
                value={loginInfo.name}
              />
              <input
                type="text"
                name={"username"}
                placeholder={"Username"}
                id={"username"}
                onChange={handleChange}
                value={loginInfo.username}
              />
              <input
                type="email"
                name={"email"}
                placeholder={"Email"}
                id={"email"}
                onChange={handleChange}
                value={loginInfo.email}
              />
              <input
                type="password"
                name={"password"}
                placeholder={"Password"}
                id={"password"}
                onChange={handleChange}
                value={loginInfo.password}
              />
              <button>Sign Up</button>
            </form>
          </>
        )}
      </Modal>
      <nav className="my-navbar">
        <Link className="logo" to="/">
          <h1>گفتگو</h1>
        </Link>
        <div className="nav-links">
          <Link to="/about-us">About</Link>
          <Link to="/programs">Programs</Link>
          <Link to="/group">Groups</Link>
          <Link to="/get-involved">Get Involved</Link>
          {user ? (
            <button onClick={handleLogout}>Logout</button>
          ) : (
            <>
              <button
                onClick={() => {
                  setRenderLogin(false);
                  openModal();
                }}
              >
                Sign Up
              </button>

              <button
                onClick={() => {
                  setRenderLogin(true);
                  openModal();
                }}
              >
                Login
              </button>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
