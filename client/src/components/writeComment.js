import React, { useState } from "react";
import axios from "axios";
import "../styles/writeComment.css";

const WriteComment = ({ post, setComments, comments, user }) => {
  const token = JSON.parse(localStorage.getItem("token")).value;
  const [commentInput, setCommentInput] = useState("");
  const postComment = (e) => {
    e.preventDefault();
    axios
      .post(
        `http://localhost:8080/api/comments/${post.id}`,
        { content: commentInput },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((data) => {
        const commentData = data.data;
        const User = { ...user };
        const finalData = { ...commentData, User };
        console.log(finalData);
        setComments([finalData, ...comments]);
        setCommentInput("");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  return (
    <>
      <div className="publication_comments">
        <div className="publication_comments_create">
          <div className="publication_comments_create_box-img">
            <img
              className="publication_comments_create_profileimg"
              src={user.profileImage}
              alt={`Avatar de  ${user.username}`}
            ></img>
          </div>
          <input
            type="text"
            className="publication_comments_create_input"
            placeholder="Écrivez un commentaire…"
            required
            value={commentInput}
            onChange={(e) => setCommentInput(e.target.value)}
          ></input>
          <div className="publication_comments_create_button" onClick={postComment}>
            <i className="fas fa-paper-plane"></i>
          </div>
        </div>
        <hr></hr>
      </div>
    </>
  );
};

export default WriteComment;
