import axios from "axios";
import React, { useEffect, useState } from "react";
import Navbar from "../components/navbar";
import Publication from "../components/publication";
import CreatePublication from "../components/createPublication";
import "../styles/home.css";

const Home = () => {
  const [post, setPost] = useState([]);
  const [user, setUser] = useState({});
  const removePublication = (publicationId) => {
    setPost(post.filter((p) => p.id !== publicationId));
  };

  const [updatePost, setUpdatePost] = useState(0);

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("token")).value;
    const userId = JSON.parse(localStorage.getItem("userId")).value;
    axios
      .get("http://localhost:8080/api/posts", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        setPost(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    axios
      .get(`http://localhost:8080/api/profile/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setUser(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [updatePost]);

  return (
    <>
      <Navbar owner={user.username} userImage={user.profileImage} userConnected={user} />;
      <CreatePublication setUpdate={setUpdatePost} update={updatePost} />
      <div className="all-publications">
        {post.map((postContent) => {
          return (
            <Publication
              key={postContent.id}
              remove={removePublication}
              rolesCurrentUser={user.roles}
              post={postContent}
              userConnected={user}
            />
          );
        })}
      </div>
    </>
  );
};

export default Home;
