import React from "react";
import "../styles/profileBar.css";
import Moment from "react-moment";
import "moment/locale/fr";

const profileBar = ({ user }) => {
  const roles = user.roles === "admin" ? <p>Administrateur</p> : <p>Utilisateur</p>;
  return (
    <>
      <div className="profileBar_box">
        <div className="profileBar_box_profile">
          <img className="profileBar_box_profile_img" src={user.profileImage} alt={`Avatar de  ${user.username}`}></img>
          <h2>{user.username}</h2>
          <p>{user.job}</p>
          {roles}
        </div>
        <div className="profileBar_box_register">
          <p>
            Inscris <Moment fromNow>{user.createdAt}</Moment>
          </p>
        </div>
        <div className="profileBar_box_activities">
          <p>{user.lastName}</p> <p>{user.firstName}</p>
        </div>
      </div>
    </>
  );
};

export default profileBar;
