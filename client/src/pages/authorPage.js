import axios from "axios";
import React, { useEffect, useState } from "react";
import Navbar from "../components/navbar";
import Publication from "../components/publication";
import ProfileBar from "../components/profileBar";
import "../styles/home.css";
import { useLocation } from "react-router";

const AuthorPage = ({}) => {
  const author = useLocation().state.post;
  const userConnected = useLocation().state.userConnected;
  const [postAuthor, setPostAuthor] = useState([]);
  const [user, setUser] = useState({});
  const removePublication = (publicationId) => {
    setPostAuthor(postAuthor.filter((p) => p.id !== publicationId));
  };

  useEffect(() => {
    const userId = JSON.parse(localStorage.getItem("userId")).value;
    const token = JSON.parse(localStorage.getItem("token")).value;
    console.log("PASSE DANS LE USE-EFFECT");
    if (author === undefined) {
      console.log("--PASSE DANS LE IF--");
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
    } else {
      console.log("--PASSE DANS LE ELSE--");
      axios
        .get(`http://localhost:8080/api/posts/author/${author.UserId}`, {
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
        .get(`http://localhost:8080/api/profile/${author.UserId}`, {
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
    }
  }, []);

  return (
    <>
      <Navbar userConnected={userConnected} />;
      <ProfileBar user={user} />
      <div className="all-publications">
        {postAuthor.map((postContent) => {
          return (
            <Publication
              key={postContent.id}
              remove={removePublication}
              rolesCurrentUser={user.roles}
              post={postContent}
              userConnected={userConnected}
            />
          );
        })}
      </div>
    </>
  );
};

export default AuthorPage;
