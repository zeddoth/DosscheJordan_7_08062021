module.exports = (app) => {
  require("./Users.js")(app);
  require("./Comments.js")(app);
  require("./Publications.js")(app);
};
