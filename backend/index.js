const express = require("express");
const cors = require("cors");
const db = require("./models");
const app = express();
const Session = require("express-session");
const bcrypt = require("bcrypt");
const { passport, checkAuthenticated, register } = require("./authentication");

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  Session({
    secret: "tic-tac-toe-cookie",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.post(
  "/login",
  (req, res, next) => {
    if (req.body.email) req.body.username = req.body.email;
    next();
  },
  passport.authenticate("local"),
  (req, res) => {
    res.json(req.user);
  }
);

app.get("/user", checkAuthenticated, (req, res) => {
  res.json(req.user);
});

app.post("/logout", function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

app.post("/register", register, passport.authenticate("local"), (req, res) => {
  res.json(req.user);
});

app.get("/", (req, res) => {
  res.send("connected!");
});

const { User } = require("./models");
db.sequelize.sync({ force: true }).then(() => {
  User.create({
    username: "testUser",
    email: "testMail@mail.com",
    password: bcrypt.hashSync("testPass", 10),
  });
});

app.listen(3000, () => {
  console.log("server started on port 3000");
});
