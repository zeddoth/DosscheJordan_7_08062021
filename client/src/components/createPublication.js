import React, { useState } from "react";
import "../styles/createPublication.css";
import axios from "axios";

const CreatePublication = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [attachment, setAttachment] = useState(null);
  const token = JSON.parse(localStorage.getItem("token")).value;
  const postPublication = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("title", title);
    data.append("content", content);
    data.append("attachment", attachment);
    axios
      .post(`http://localhost:8080/api/posts`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  return (
    <>
      <div className="create_publication">
        <div className="create_publication_box">
          <form encType="multipart/form-data">
            <label className="form_label">
              Titre :
              <input
                className="form_input form_input_title"
                type="text"
                value={title}
                placeholder="Votre titre de publication."
                onChange={(e) => setTitle(e.target.value)}
              />
            </label>
            <label className="form_label" name="content">
              Contenu :
              <textarea
                className="form_input form_input_content"
                id="content"
                name="content"
                value={content}
                placeholder="Le contenu de votre publication."
                onChange={(e) => setContent(e.target.value)}
              />
            </label>
            <div className="create_publication_box_buttons">
              <label className="form_button_gray" htmlFor="file">
                Ajouter fichier
                <input
                  id="file"
                  type="file"
                  className="invisible"
                  accept=".jpg, .jpeg, .png, .gif, .bmp"
                  onChange={(e) => setAttachment(e.target.files[0])}
                />
              </label>
              <button className="form_button_green" onClick={postPublication}>
                Publier
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default CreatePublication;
