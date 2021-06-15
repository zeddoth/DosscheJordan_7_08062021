module.exports = (app) => {
  require("./Users.js")(app);
  // require("./comments.js")(app),
  require("./Publications.js")(app);
};
