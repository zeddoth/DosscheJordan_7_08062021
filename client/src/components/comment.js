import React from "react";
import axios from "axios";
import Moment from "react-moment";
import { Link } from "react-router-dom";
import "moment/locale/fr";
import "../styles/comment.css";

const Comment = ({ commentContent, rolesCurrentUser, remove, post, userConnected }) => {
  const token = JSON.parse(localStorage.getItem("token")).value;
  const UserId = JSON.parse(localStorage.getItem("userId")).value;
  const profileImgRoute = commentContent.User.profileImage
    ? commentContent.User.profileImage
    : require("../styles/medias/defaultProfile.png").default;
  const deleteComment = async () => {
    try {
      await remove(commentContent.id);
      await axios.delete(`http://localhost:8080/api/comments/${commentContent.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (err) {
      console.log(err.message);
    }
  };
  const adminDeleteComment = async () => {
    try {
      await remove(commentContent.id);
      await axios.delete(`http://localhost:8080/api/admin/comments/${commentContent.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (err) {
      console.log(err.message);
    }
  };
  const isAdminForDelete = () => {
    if (rolesCurrentUser === "admin") {
      return (
        <div className="comment_box_content-delete">
          <i className="far fa-trash-alt comment_box_content-delete-icon" onClick={adminDeleteComment}></i>
        </div>
      );
    } else {
      return null;
    }
  };
  const isOwnerForDelete = () => {
    if (commentContent.UserId === UserId && rolesCurrentUser === "user") {
      return (
        <div className="comment_box_content-delete">
          <i className="far fa-trash-alt comment_box_content-delete-icon" onClick={deleteComment}></i>
        </div>
      );
    } else {
      return null;
    }
  };
  return (
    <>
      <div className="comment_box_content fade-in-fwd">
        <div className="comment_box_content-img">
          <Link
            to={{ pathname: `/profile?id=${commentContent.UserId}`, state: { post, userConnected, commentContent } }}
            onClick={() => {
              window.location.href = `/profile?id=${commentContent.UserId}`;
            }}
          >
            <img className="comment_box_content-img-profileimg" src={profileImgRoute} alt="avatar de zeddoth"></img>
          </Link>
        </div>
        <div className="comment_box_content-comment">
          <div className="comment_box_content-text">
            <div className="comment_box_content-text_author">
              <h4>{commentContent.User.username}</h4>
              <p className="mini">
                Publié <Moment fromNow>{commentContent.createdAt}</Moment>
              </p>
            </div>
            <p>{commentContent.content}</p>
          </div>
          {isAdminForDelete()}
          {isOwnerForDelete()}
        </div>
      </div>
    </>
  );
};

export default Comment;
