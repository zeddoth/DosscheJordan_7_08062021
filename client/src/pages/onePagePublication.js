import React, { useEffect, useState } from "react";
import Navbar from "../components/navbar";
import Publication from "../components/publication";
import { useLocation } from "react-router";

const Home = ({ remove }) => {
  // const token = JSON.parse(localStorage.getItem("token")).value;
  // const userId = JSON.parse(localStorage.getItem("userId")).value;

  const post = useLocation().state.post;
  const user = useLocation().state.userConnected;

  return (
    <>
      <Navbar owner={user.username} userImage={user.profileImage} />
      <div className="one-publication">
        <Publication post={post} rolesCurrentUser={user.roles} />
      </div>
    </>
  );
};

export default Home;
