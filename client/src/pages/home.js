import axios from "axios";
import React, { useEffect, useState } from "react";
import Navbar from "../components/navbar";
import Publication from "../components/publication";
import CreatePublication from "../components/createPublication";
import "../styles/home.css";

const Home = () => {
  const [post, setPost] = useState([]);
  const token = JSON.parse(localStorage.getItem("token")).value;
  const removePublication = (publicationId) => {
    setPost(post.filter((p) => p.id !== publicationId));
  };
  useEffect(() => {
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
  }, []);
  return (
    <>
      <Navbar />
      <CreatePublication />
      <div className="all-publications">
        {post.map((e, index) => {
          return (
            <Publication
              key={index}
              author={e.User.username}
              content={e.content}
              title={e.title}
              createdAt={e.createdAt}
              like={e.like}
              dislike={e.dislike}
              userImage={e.User.profileImage}
              attachment={e.attachment}
              roles={e.User.roles}
              publicationId={e.id}
              remove={removePublication}
            />
          );
        })}
      </div>
    </>
  );
};

export default Home;
