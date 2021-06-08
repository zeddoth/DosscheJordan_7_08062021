// Les imports
let express = require("express");

// Instansation de notre serveur
let server = express();

// Paramètrage des routes
server.get("/", function (req, res) {
  res.setHeader("Content-Type", "text/html");
  res.status(200).send("<h1>Bonjour sur mon serveur</h1>");
});

// Lancement du serveur
server.listen(8080, function () {
  console.log("Status du serveur : ON");
});
