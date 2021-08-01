const express = require("express");
const app = express();
const db = require("./models");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const expressSanitizer = require("express-sanitizer");
require("dotenv").config();
const PORT = process.env.PORT || 8080;

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 500, // limit each IP to 50 requests per windowMs
  message: "Vous avez effectuez trop de requête en moins d'1 minute",
});

app.post("/", function (req, res, next) {
  // replace an HTTP posted body property with the sanitized string
  const sanitizedString = req.sanitize(req.body.propertyToSanitize);
  // send the response -- res.body.sanitized = " world"
  res.send({ sanitized: sanitizedString });
});

app.use(helmet());
app.use(expressSanitizer());
app.use(limiter);
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// dossier contenant nos uploads
app.use("/uploads", express.static("uploads"));

require("./routes/router")(app);

db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Serveur ON: http://localhost:${PORT}`);
  });
});
