const express = require("express");
const app = express();
const db = require("./models");
const cors = require("cors");
require("dotenv").config();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/uploads", express.static("uploads"));

require("./routes/router")(app);

db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Serveur ON: http://localhost:${PORT}`);
  });
});
