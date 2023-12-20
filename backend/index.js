const express = require("express");
const cors = require("cors");
const db = require("./models");
const app = express();
const Session = require("express-session");
const { passport, checkAuthenticated } = require("./authentication");

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
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
  })
);

app.get("/check", checkAuthenticated, (req, res) => {
  res.send("logged in");
});

app.get("/", (req, res) => {
  res.send("connected!");
});

const { User } = require("./models");

db.sequelize.sync({ force: true }).then((req) => {
  User.create({
    username: "testUser",
    password: "testPass",
  });
});

app.listen(3000, () => {
  console.log("server started on port 3000");
});
