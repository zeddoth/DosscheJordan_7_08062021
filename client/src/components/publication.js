import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";
import "../styles/publication.css";
import Moment from "react-moment";
import "moment/locale/fr";
import { useHistory, useParams } from "react-router";

const Publication = ({ post, remove, rolesCurrentUser, userConnected }) => {
  const redirectToHome = useHistory();
  let { idPost } = useParams();
  const profileImgRoute = post.User.profileImage ?? "defaultProfile.png";
  const postImgRoute = post.attachment ?? "defaultPublication.png";
  const UserId = JSON.parse(localStorage.getItem("userId")).value;
  const isAdmin = () => {
    if (post.roles === "admin") {
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
    if (post.attachment === null) {
      return null;
    } else {
      return (
        <div className="publication_image">
          <img
            className="publication_image_src"
            src={require(`../styles/medias/uploaded/${postImgRoute}`).default}
            alt={`Media de la publication de ${post.author}`}
          ></img>
        </div>
      );
    }
  };
  const deletePublication = async () => {
    const token = JSON.parse(localStorage.getItem("token")).value;
    try {
      if (!idPost) remove(post.id);
      if (idPost) redirectToHome.push("/");
      await axios.delete(`http://localhost:8080/api/posts/${post.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (e) {
      console.log(e);
    }
  };
  const adminDeletePublication = async () => {
    const token = JSON.parse(localStorage.getItem("token")).value;
    try {
      if (!idPost) remove(post.id);
      if (idPost) redirectToHome.push("/");
      await axios.delete(`http://localhost:8080/api/admin/posts/${post.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (e) {
      console.log(e);
    }
  };
  const isOwnerForDelete = () => {
    if (post.UserId === UserId) {
      return (
        <div>
          <i className="far fa-trash-alt publication_delete-icon" onClick={deletePublication}></i>
        </div>
      );
    } else {
      return null;
    }
  };
  const isAdminForDelete = () => {
    if (rolesCurrentUser === "admin") {
      return (
        <div>
          <i className="far fa-trash-alt publication_delete-icon" onClick={adminDeletePublication}></i>
        </div>
      );
    } else {
      return null;
    }
  };

  return (
    <>
      <div className="publications_box bounce">
        <div className="publication">
          <div className="publication_profile">
            <img
              className="publication_profile-image"
              src={require(`../styles/medias/uploaded/${profileImgRoute}`).default}
              alt={`Avatar de  ${post.User.username}`}
            ></img>
            {isAdmin()}
          </div>
          <div className="publication_date">
            <p className="publication_date_publication">
              Publié par {post.User.username} <Moment fromNow>{post.createdAt}</Moment>
            </p>
          </div>
          <div className="publication_content">
            <hr></hr>
            <Link to={{ pathname: `/publication?id=${post.id}`, state: { post, userConnected } }}>
              <h2>{post.title}</h2>
            </Link>
            <p>{post.content}</p>
            <div className="fade"></div>
          </div>
          {validAttachment()}
          <div className="publication_like_comments">
            <hr></hr>
            <i className="far fa-thumbs-up icon like"></i>
            <span className="number">{post.like}</span> <i className="far fa-thumbs-down icon dislike"></i>
            <span className="number">{post.dislike}</span>
            <i className="fas fa-comments icon blue"></i>
            <span className="number">{post.comment} Commentaires</span>
          </div>
          {isOwnerForDelete()}
          {isAdminForDelete()}
        </div>
      </div>
    </>
  );
};

export default Publication;
