import axios from "axios";
import React from "react";
import "../styles/publication.css";
import Moment from "react-moment";
import "moment/locale/fr";
// import "moment-timezone";

const Publication = ({
  author,
  createdAt,
  title,
  content,
  attachment,
  like,
  dislike,
  comments,
  userImage,
  publicationId,
}) => {
  const deletePublication = () => {
    const token = JSON.parse(localStorage.getItem("token")).value;
    axios.delete(`http://localhost:8080/api/posts/${publicationId}`, {
      headers: {
        Authorization: `token ${token}`,
      },
    });
  };
  return (
    <>
      <div className="publications_box bounce">
        <div className="publication">
          <div className="publication_profile">
            <img
              className="publication_profile-image"
              src={require(`../styles/medias/uploaded/${userImage}`).default}
              alt={`Avatar de  ${author}`}
            ></img>
            <div className="publication_profile-role">
              <i className="fas fa-star yellow-star"></i>
            </div>
          </div>
          <div className="publication_date">
            <p className="publication_date_publication">
              Publié par {author} <Moment fromNow>{createdAt}</Moment>
            </p>
          </div>
          <div className="publication_content">
            <hr></hr>
            <h2>{title}</h2>
            <p>{content}</p>
            <div className="fade"></div>
          </div>
          <div className="publication_like_comments">
            <hr></hr>
            <i className="far fa-thumbs-up icon like"></i>
            <span className="number">{like}</span>{" "}
            <i className="far fa-thumbs-down icon dislike"></i>
            <span className="number">{dislike}</span>
            <i className="fas fa-comments icon blue"></i>
            <span className="number">{comments} Commentaires</span>
          </div>
          <div>
            <i className="far fa-trash-alt publication_delete-icon" onClick={deletePublication}></i>
          </div>
        </div>
      </div>
    </>
  );
};

export default Publication;
