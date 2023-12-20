const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const { User } = require("../models");

passport.use(new LocalStrategy(authenticateUser));

function authenticateUser(username, password, done) {
  let user = User.findAll({
    attributes: ["username", "password", "isActive"],
    where: {
      username: username,
    },
  }).then((user) => {
    return user.isActive ? (user.password == password ? user : false) : false;
  });
  return done(null, user);
}

passport.serializeUser((userObj, done) => {
  done(null, userObj);
});

passport.deserializeUser((userObj, done) => {
  done(null, userObj);
});

checkAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  }
  res.redirect("/login");
};

module.exports = { passport, checkAuthenticated };
