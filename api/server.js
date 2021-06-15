const express = require("express");
const app = express();
const db = require("./models");
require("dotenv").config();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

require("./routes/router")(app);

db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Serveur ON: http://localhost:${PORT}`);
  });
});
