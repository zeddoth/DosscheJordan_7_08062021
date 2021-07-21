import axios from "axios";
import React, { useEffect, useState } from "react";
import Navbar from "../components/navbar";
import Publication from "../components/publication";
import ProfileBar from "../components/profileBar";
import "../styles/home.css";

const authorPage = () => {
  const [postAuthor, setPostAuthor] = useState([]);
  const [user, setUser] = useState({});
  const removePublication = (publicationId) => {
    setPostAuthor(postAuthor.filter((p) => p.id !== publicationId));
  };

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("token")).value;
    const userId = JSON.parse(localStorage.getItem("userId")).value;
    axios
      .get(`http://localhost:8080/api/posts/author/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        setPostAuthor(response.data);
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
  }, []);

  return (
    <>
      <Navbar owner={user.username} userImage={user.profileImage} />;
      <ProfileBar user={user} owner={postAuthor.UserId} />
      <div className="all-publications"></div>
    </>
  );
};

export default authorPage;
