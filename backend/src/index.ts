import Express from "express";
import cors from "cors";
import http from "http";
import { sync } from "./models/sequelizeConfig";
import sessionMiddleware from "./middleware/sessionMiddleware";
import { passport } from "./authentication/passportConfig";
import { router as userRouter } from "./routing/userRouter";
import { createServer } from "@/socket/socket";
import { router as roomRouter } from "@/game/room/roomRouter";
import { setupMessaging } from "./amqp/messageQueue";

const app = Express();
const server = http.createServer(app);
createServer(server);
sync();

app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
    exposedHeaders: ["set-cookie"],
  })
);
app.use(Express.urlencoded({ extended: true }));
app.use(Express.json());
app.use(sessionMiddleware);
app.use(passport.initialize());
app.use(passport.session());
app.use(userRouter);
app.use("/rooms", roomRouter);

server.listen(3000, () => {
  console.log("server started on port 3000");
});

setupMessaging();
