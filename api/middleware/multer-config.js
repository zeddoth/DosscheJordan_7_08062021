const multer = require("multer");

const MIME_TYPES = {
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/gif": "gif",
  "video/mp4": "mp4",
};

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "assets/medias/");
  },
  filename: (req, file, callback) => {
    const name = file.originalname.split(" ").join("_");
    const extension = MIME_TYPES[file.mimetype];
    callback(null, Date.now() + "-" + name);
  },
});

module.exports = multer({ storage: storage }).single("attachment");
