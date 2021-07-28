import axios from "axios";
import React, { useState } from "react";
import Navbar from "../components/navbar";
import "../styles/editProfile.css";
import { useLocation, useHistory } from "react-router";

const EditProfile = () => {
  const user = useLocation().state.userConnected;
  const redirect = useHistory();
  const profileImgRoute = user.profileImage
    ? user.profileImage
    : require("../styles/medias/defaultProfile.png").default;
  const token = JSON.parse(localStorage.getItem("token")).value;
  const userId = JSON.parse(localStorage.getItem("userId")).value;
  const [lastname, setLastname] = useState(user.lastName ? user.lastName : "");
  const [firstname, setFirstname] = useState(user.firstName ? user.firstName : "");
  const [job, setJob] = useState(user.job ? user.job : "");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [warning, setWarning] = useState("");
  const dataInfos = {
    firstName: firstname,
    lastName: lastname,
    job: job,
  };
  const dataPassword = {
    password: password,
  };
  const dataImage = new FormData();
  dataImage.append("profileImage", profileImage);

  const editInfos = async () => {
    await axios
      .put(`http://localhost:8080/api/profile/${userId}`, dataInfos, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        setWarning(response.data.message);
      })
      .catch(() => {
        setWarning("Veuillez entrez de nouvelles informations");
      });
  };
  const editPassword = async () => {
    if (password != rePassword) {
      setWarning("Les mot de passes ne correspondent pas");
      return false;
    }
    await axios
      .put(`http://localhost:8080/api/profile/${userId}/password`, dataPassword, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        setWarning(response.data.message);
        setPassword("");
        setRePassword("");
      })
      .catch(() => {
        setWarning("Veuillez entrez un nouveau mot de passe!");
      });
  };
  const editImage = async () => {
    if (profileImage === null) {
      setWarning("Veuillez inserez une image de profil");
      return false;
    }
    await axios
      .put(`http://localhost:8080/api/profile/${userId}/image`, dataImage, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        setProfileImage(null);
        redirect.push("/");
      })
      .catch((response) => {
        console.log(response);
      });
  };
  const deleteAccount = async () => {
    await axios
      .delete(`http://localhost:8080/api/profile/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        localStorage.clear();
        redirect.push("/login");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const ifWarning = () => {
    if (warning === "") {
      return null;
    } else {
      return (
        <div className="edit_box_warning">
          <p>{warning}</p>
        </div>
      );
    }
  };

  return (
    <>
      <Navbar userConnected={user} />;
      <div className="edit_box column">
        <div className="edit_box-row">
          <div className="edit_box_profileImage">
            <p>Image de profil :</p>
            <div className="edit_box_profileImage_src">
              <img className="edit_box_profileImage_srcImg" src={profileImgRoute} alt="DJO"></img>
              <label forhtml="file">
                <i className="fas fa-plus-circle big send-img">
                  <input
                    id="file"
                    type="file"
                    className="invisible"
                    accept=".jpg, .jpeg, .png, .gif, .bmp"
                    onChange={(e) => setProfileImage(e.target.files[0])}
                  />
                </i>
              </label>
              <i className="fas fa-check-circle big valid-img" onClick={editImage}></i>
            </div>
          </div>
          <div className="edit_box_password">
            <div className="edit_box_password_warning">
              <p>
                Nous vous conseillons d'utiliser un mot de passe avec des nombres ainsi que des majuscules, bien que
                cela ne sois pas obligatoire.
              </p>
            </div>
            <div className="edit_box_password_input column">
              <label forhtml="password" className="labelbox">
                <i className="fas fa-lock margin15"></i>Nouveau mot de passe :
              </label>
              <input
                type="password"
                name="password"
                id="password"
                className="inputbox"
                value={password}
                autoComplete="new-password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="edit_box_password_input column">
              <label forhtml="rePassword" className="labelbox">
                <i className="fas fa-lock margin15"></i>Confirmer le mot de passe :
              </label>
              <input
                type="password"
                name="rePassword"
                id="rePassword"
                className="inputbox"
                value={rePassword}
                autoComplete="new-password"
                onChange={(e) => setRePassword(e.target.value)}
              ></input>
            </div>
          </div>
          <div className="edit_box_infos">
            <div className="edit_box_infos_input column">
              <label forhtml="firstname" className="labelbox">
                <i className="fas fa-user margin15"></i>Prénom :
              </label>
              <input
                type="text"
                name="firstname"
                id="firstname"
                className="inputbox"
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
              />
            </div>
            <div className="edit_box_infos_input column">
              <label forhtml="lastname" className="labelbox">
                <i className="fas fa-user margin15"></i>Nom :
              </label>
              <input
                type="text"
                name="lastname"
                id="lastname"
                className="inputbox"
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
              />
            </div>
            <div className="edit_box_infos_input column">
              <label forhtml="job" className="labelbox">
                <i className="fas fa-briefcase margin15"></i>Profession :
              </label>
              <input
                type="text"
                name="job"
                id="job"
                className="inputbox"
                value={job}
                onChange={(e) => setJob(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="edit_box_buttons">
          {ifWarning()}
          <button className="button yellow-button" onClick={deleteAccount}>
            Supprimer le compte
          </button>
          <button className="button green-button" onClick={editPassword}>
            Modifier le mot de passe
          </button>
          <button className="button blue-button" onClick={editInfos}>
            Modifier les informations
          </button>
        </div>
      </div>
    </>
  );
};

export default EditProfile;
