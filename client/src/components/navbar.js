import React from "react";
import { Link } from "react-router-dom";
import ReactTooltip from "react-tooltip";
import "../styles/navbar.css";
import logo from "../styles/medias/logo-only.png";

const Navbar = ({ userConnected }) => {
  const userId = JSON.parse(localStorage.getItem("userId")).value;
  const imgUrl = userConnected.profileImage
    ? userConnected.profileImage
    : require("../styles/medias/defaultProfile.png").default;
  const disconnect = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
  };
  return (
    <>
      <div className="navbar">
        <div className="navbar_logo">
          <img className="navbar_logo-only" src={logo} alt="Logo Groupomania" />
        </div>
        <div className="navbar_end">
          <div className="navbar_button_box">
            <div className="navbar_button_box-home">
              <Link to="/">
                <i
                  className="fas fa-home navbar_button_box_icon tooltip"
                  title="Retourner à l'accueil"
                  data-tip
                  data-for="home"
                ></i>
                <ReactTooltip id="home" place="bottom" effect="solid">
                  <span>Retourner à l'accueil</span>
                </ReactTooltip>
              </Link>
            </div>
            <div className="navbar_button_box-edit">
              <Link to={{ pathname: `/edit`, state: { userConnected } }}>
                <i
                  className="fas fa-cog navbar_button_box_icon"
                  title="Modifier le profil"
                  data-tip
                  data-for="edit"
                ></i>
                <ReactTooltip id="edit" place="bottom" effect="solid">
                  <span>Modifier le Profil</span>
                </ReactTooltip>
              </Link>
            </div>
          </div>
          <div className="navbar_profile">
            <Link to={{ pathname: `/profile?id=${userId}`, state: { userConnected } }}>
              <img className="navbar_profile_image" src={imgUrl} alt={`Avatar de  ${userConnected.username}`} />
            </Link>
            <Link to="/login">
              <i className="fas fa-times-circle navbar_profile_disconnect" onClick={disconnect} title="Deconnexion"></i>
            </Link>
            <p className="navbar_profile_name">{userConnected.username}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
