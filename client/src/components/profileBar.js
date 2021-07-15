import React from "react";
import "../styles/profileBar.css";
import Moment from "react-moment";
import "moment/locale/fr";

const profileBar = ({ owner, roles, job, createdAt, numberOfPublications, numberOfComments, userImage }) => {
  return (
    <>
      <div className="profileBar_box">
        <div className="profileBar_box_profile">
          <img
            className="profileBar_box_profile_img"
            src={require(`../styles/medias/uploaded/${userImage}`).default}
            alt={`Avatar de  ${owner}`}
          ></img>
          <h2>{owner}</h2>
          <p>{job}</p>
          <p>{roles}</p>
        </div>
        <div className="profileBar_box_register">
          <p>
            Inscris <Moment fromNow>{createdAt}</Moment>
          </p>
        </div>
        <div className="profileBar_box_activities">
          <p>{numberOfComments} Commentaires</p> <p>{numberOfPublications} Publications</p>
        </div>
      </div>
    </>
  );
};

export default profileBar;
