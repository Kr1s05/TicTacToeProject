const express = require("express");
const cors = require("cors");
const db = require("./models");
const app = express();
const bcrypt = require("bcrypt");
const { passport } = require("./authentication");
const http = require("http");
const sessionMiddleware = require("./middleware/sessionMiddleware");
const server = http.createServer(app);
const io = require("./socket").createServer(server);
const { createRoom, getRooms } = require("./game/room")(io);
const userRouter = require("./routing/userRouter");
app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
    exposedHeaders: ["set-cookie"],
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(sessionMiddleware);
app.use(passport.initialize());
app.use(passport.session());
app.use(userRouter);

app.get("/", (req, res) => {
  res.send("connected!");
});

app.get("/rooms", (req, res) => {
  res.json(getRooms());
});

const { User } = require("./models");
db.sequelize.sync({ force: true }).then(() => {
  User.create({
    username: "testUser",
    email: "testMail@mail.com",
    password: bcrypt.hashSync("testPass", 10),
  });
});

server.listen(3000, () => {
  console.log("server started on port 3000");
});
