import axios from "axios";
import React from "react";
import "../styles/publication.css";
import Moment from "react-moment";
import "moment/locale/fr";

const Publication = ({
  author,
  roles,
  createdAt,
  title,
  content,
  attachment,
  like,
  dislike,
  comments,
  userImage,
  publicationId,
  remove,
}) => {
  const isAdmin = () => {
    if (roles === "admin") {
      return (
        <div className="publication_profile-role">
          <i className="fas fa-star yellow-star"></i>
        </div>
      );
    } else {
      return null;
    }
  };
  const validAttachment = () => {
    if (attachment === null) {
      return null;
    } else {
      return (
        <div className="publication_image">
          <img
            className="publication_image_src"
            src={require(`../styles/medias/uploaded/${attachment}`).default}
            alt={`Media de la publication de ${author}`}
          ></img>
        </div>
      );
    }
  };
  const deletePublication = async () => {
    const token = JSON.parse(localStorage.getItem("token")).value;
    try {
      remove(publicationId);
      await axios.delete(`http://localhost:8080/api/posts/${publicationId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (e) {
      console.log(e);
    }
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
            {isAdmin()}
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
          {validAttachment()}
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
