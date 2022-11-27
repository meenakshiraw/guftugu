import React, { useState } from "react";
import Modal from "react-modal";
import { Link } from "react-router-dom";

const customStyles = {
  content: {
    display: "flex",
    flexDirection: "column",
    width: "50vw",
    margin: "0 auto",
  },
};

Modal.setAppElement("#root");

function Navbar() {
  let subtitle;
  const [renderLogin, setRenderLogin] = useState();
  const [modalIsOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const afterOpenModal = () => {
    subtitle.style.color = "#f00";
  };

  const closeModal = () => {
    setModalOpen(false);
  };
  return (
    <header>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        {renderLogin ? (
          <>
            <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Log In</h2>
            <form className="register-form">
              <input
                type="email"
                name={"email"}
                placeholder={"Email"}
                id={"email"}
              />
              <input
                type="password"
                name={"password"}
                placeholder={"Password"}
                id={"password"}
              />
              <button>Login</button>
            </form>
            <p>
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
            <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Register</h2>
            <p>
              By continuing, you agree are setting up a Guftugu account and
              agree to our User Agreement and Privacy Policy.
            </p>
            <form className="register-form">
              <input
                type="text"
                name={"name"}
                placeholder={"Name"}
                id={"name"}
              />
              <input
                type="text"
                name={"username"}
                placeholder={"Username"}
                id={"username"}
              />
              <input
                type="email"
                name={"email"}
                placeholder={"Email"}
                id={"email"}
              />
              <input
                type="password"
                name={"password"}
                placeholder={"Password"}
                id={"password"}
              />
              <button>Login</button>
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
          <Link to="/get-involved">Get Involved</Link>
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
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
