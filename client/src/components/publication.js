import axios from "axios";
import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import "../styles/publication.css";
import Moment from "react-moment";
import "moment/locale/fr";
import { useHistory, useParams } from "react-router";

const Publication = ({ post, remove, rolesCurrentUser, userConnected }) => {
  const profileImgRoute = post.User.profileImage
    ? post.User.profileImage
    : require("../styles/medias/defaultProfile.png").default;
  const token = JSON.parse(localStorage.getItem("token")).value;
  const UserId = JSON.parse(localStorage.getItem("userId")).value;
  const redirectToHome = useHistory();
  let { idPost } = useParams();
  const [like, setLike] = useState(post.like);
  const [dislike, setDislike] = useState(post.dislike);
  const [likeOrDislike, setLikeOrDislike] = useState(
    post.PublicationsLikes.length === 0 ? null : post.PublicationsLikes[0].state
  );
  const isAdmin = () => {
    if (post.User.roles === "admin") {
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
            src={post.attachment}
            alt={`Media de la publication de ${post.author}`}
          ></img>
        </div>
      );
    }
  };
  const deletePublication = async () => {
    try {
      if (!idPost) remove(post.id);
      if (idPost) redirectToHome.push("/");
      await axios.delete(`http://localhost:8080/api/posts/${post.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (e) {}
  };
  const adminDeletePublication = async () => {
    try {
      if (!idPost) remove(post.id);
      if (idPost) redirectToHome.push("/");
      await axios.delete(`http://localhost:8080/api/admin/posts/${post.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (e) {}
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
  const isOwnerForDelete = () => {
    if (post.UserId === UserId && rolesCurrentUser === "user") {
      return (
        <div>
          <i className="far fa-trash-alt publication_delete-icon" onClick={deletePublication}></i>
        </div>
      );
    } else {
      return null;
    }
  };
  const updateLike = () => {
    if (likeOrDislike === "liked") {
      setLikeOrDislike(null);
      return setLike(like - 1);
    }
    if (likeOrDislike === null) {
      setLikeOrDislike("liked");
      return setLike(like + 1);
    }
    setLikeOrDislike("liked");
    setLike(like + 1);
    setDislike(dislike - 1);
  };
  const updateDislike = () => {
    if (likeOrDislike === "disliked") {
      setLikeOrDislike(null);
      return setDislike(dislike - 1);
    }
    if (likeOrDislike === null) {
      setLikeOrDislike("disliked");
      return setDislike(dislike + 1);
    }
    setLikeOrDislike("disliked");
    setDislike(dislike + 1);
    setLike(like - 1);
  };
  const likePublication = async () => {
    await axios.put(
      `http://localhost:8080/api/posts/${post.id}/like`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    updateLike();
  };
  const dislikePublication = async () => {
    await axios.put(
      `http://localhost:8080/api/posts/${post.id}/dislike`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    updateDislike();
  };
  const likeStatus = () => {
    if (likeOrDislike === "liked") {
      return <i className="fas fa-thumbs-up icon like" onClick={likePublication}></i>;
    } else {
      return <i className="far fa-thumbs-up icon like" onClick={likePublication}></i>;
    }
  };
  const dislikeStatus = () => {
    if (likeOrDislike === "disliked") {
      return <i className="fas fa-thumbs-down icon dislike" onClick={dislikePublication}></i>;
    } else {
      return <i className="far fa-thumbs-down icon dislike" onClick={dislikePublication}></i>;
    }
  };
  return (
    <>
      <div className="publications_box bounce">
        <div className="publication">
          <div className="publication_profile">
            <Link
              to={{ pathname: `/profile?id=${post.UserId}`, state: { post, userConnected } }}
              onClick={() => {
                window.location.href = `/profile?id=${post.UserId}`;
              }}
            >
              <img
                className="publication_profile-image"
                src={profileImgRoute}
                alt={`Avatar de  ${post.User.username}`}
              ></img>
            </Link>
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
            {likeStatus()}
            <span className="number">{like}</span>
            {dislikeStatus()}
            <span className="number">{dislike}</span>
            <Link to={{ pathname: `/publication?id=${post.id}`, state: { post, userConnected } }}>
              <i className="fas fa-comments icon blue"></i>
              <span className="number">{post.comment} Commentaires</span>
            </Link>
          </div>
          {isAdminForDelete()}
          {isOwnerForDelete()}
        </div>
      </div>
    </>
  );
};

export default Publication;
