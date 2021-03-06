import React, { useEffect, useState } from "react";
import Navbar from "../components/navbar";
import Publication from "../components/publication";
import WriteComment from "../components/writeComment";
import Comment from "../components/comment";
import { useLocation } from "react-router";
import axios from "axios";

const OnePagePublication = () => {
  const post = useLocation().state.post;
  const userConnected = useLocation().state.userConnected;
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState(post.comment);
  const removeComments = (commentId) => {
    setComments(comments.filter((p) => p.id !== commentId));
    setComment(comments.length - 1);
  };
  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("token")).value;
    axios
      .get(`http://localhost:8080/api/comments/${post.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        setComments(response.data);
        console.log(comments);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [post]);

  return (
    <>
      <Navbar userConnected={userConnected} />
      <div className="one-publication">
        <Publication
          post={post}
          rolesCurrentUser={userConnected.roles}
          userConnected={userConnected}
          comment={comment}
        />
        <WriteComment
          user={userConnected}
          post={post}
          setComments={setComments}
          setComment={setComment}
          comments={comments}
        />
        <div className="comment_box">
          {comments.map((commentContent) => {
            return (
              <Comment
                key={commentContent.id}
                rolesCurrentUser={userConnected.roles}
                commentContent={commentContent}
                userConnected={userConnected}
                remove={removeComments}
                post={post}
                userConnected={userConnected}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};

export default OnePagePublication;
