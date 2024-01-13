const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const { User } = require("../models");
const { Op } = require("sequelize");

passport.use(new LocalStrategy(authenticateUser));

function authenticateUser(username, password, done) {
  User.findOne({
    attributes: ["username", "email", "password", "isActive"],
    where: {
      [Op.or]: [{ username: username }, { email: username }],
    },
  })
    .then((user) => {
      if (!user) return false;
      if (!user.isActive) return false;
      if (user.password != password) return false;
      return user;
    })
    .then((user) => {
      return done(null, user);
    })
    .catch((error) => {
      return done(error);
    });
}

passport.serializeUser((userObj, done) => {
  done(null, userObj);
});

passport.deserializeUser((userObj, done) => {
  done(null, userObj);
});

checkAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).send("Unauthorized");
};

module.exports = { passport, checkAuthenticated };
