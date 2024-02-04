import session from "express-session";
export default session({
  secret: "tic-tac-toe-cookie",
  resave: true,
  saveUninitialized: true,
  cookie: {
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  },
});
