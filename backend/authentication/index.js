const passport = require("passport");
const bcrypt = require("bcrypt");
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
      return bcrypt.compare(password, user.password).then(function (result) {
        let { username, email } = user;
        return result ? { username, email } : false;
      });
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

function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).send("Unauthorized");
}

function register(req, res, next) {
  const { username, email, password } = req.body;
  if (!password || password.length < 4 || password.length > 16) {
    return res.status(400).send("password should be 4-16 characters long");
  }
  User.create({
    username,
    email,
    password: bcrypt.hashSync(password, 10),
  })
    .then(() => {
      return next();
    })
    .catch((error) => {
      return res.status(409).send(error["errors"][0]["message"]);
    });
}

module.exports = { passport, checkAuthenticated, register };
