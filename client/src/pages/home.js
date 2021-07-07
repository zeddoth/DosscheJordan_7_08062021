import axios from "axios";
import React, { useEffect, useState } from "react";
import Navbar from "../components/navbar";
import Publication from "../components/publication";
import "../styles/home.css";

const Home = () => {
  const [post, setPost] = useState([]);
  const token = JSON.parse(localStorage.getItem("token")).value;
  useEffect(() => {
    axios
      .get("http://localhost:8080/api/posts", {
        headers: {
          Authorization: `token ${token}`,
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
              userImage={e.User.profileImage.replace(
                "http://localhost:3000/styles/medias/uploaded/",
                ""
              )}
              publicationId={e.id}
            />
          );
        })}
      </div>
    </>
  );
};

export default Home;
