const Session = require("express-session");
const sessionMiddleware = Session({
  secret: "tic-tac-toe-cookie",
  resave: true,
  saveUninitialized: true,
  cookie: {
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  },
});

module.exports = sessionMiddleware;
