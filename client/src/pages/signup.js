import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../styles/login-signup.css";
import logo from "../styles/medias/logo-font.png";
import user from "../styles/medias/user.svg";
import lock from "../styles/medias/lock.svg";
import warning from "../styles/medias/warning.svg";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8080/api/signup", {
        username: username,
        password: password,
      })
      .then(function (response) {
        console.log(response.data);
        setErrorMessage("");
        window.location.assign("/login");
      })
      .catch(function (error) {
        console.log(error.response.data.message);
        setErrorMessage(error.response.data.message);
      });
  };

  return (
    <>
      <div className="box">
        <div className="logo_box">
          <h1>
            <img className="logo" src={logo} alt="Groupomania" />
          </h1>
        </div>
        <div className="form_box">
          <form>
            <div className="form_box_input">
              <label htmlFor="username">
                <img className="form_box_input_svg" src={user} alt="user" />
                Nom d'utilisateur :
              </label>
              <input
                autoComplete="username²"
                id="username"
                className="input"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />

              <label htmlFor="password">
                <img className="form_box_input_svg" src={lock} alt="lock" />
                Mot de passe :
              </label>
              <input
                autoComplete="current-password"
                id="password"
                className="input"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <label htmlFor="repassword">
                <img className="form_box_input_svg" src={lock} alt="lock" />
                Confirmer le mot de passe :
              </label>
              <input autoComplete="current-password" id="repassword" className="input" type="password" />

              {errorMessage ? (
                <p className="errorMessage">
                  <img className="form_box_input_svg" src={warning} alt="warning" />
                  {errorMessage}
                </p>
              ) : null}
            </div>
            <div className="form_box_button">
              <button className="form_button_green" onClick={handleSubmit}>
                Inscription
              </button>
              <Link to="/login">
                <button className="form_button_red">Retour</button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Signup;
