import http from "http";
import { onlyForHandshake } from "@/middleware/socketMiddleware";
import { passport } from "@/authentication/passportConfig";
import sessionMiddleware from "@/middleware/sessionMiddleware";
import { Server } from "socket.io";
import { setup as roomSetup } from "@/game/room/gameRoom";
import { setup as gameSetup } from "@/game/game";
let server, io: Server;

function setup() {
  io.engine.use(onlyForHandshake(sessionMiddleware));
  io.engine.use(onlyForHandshake(passport.session()));
  io.engine.use(
    onlyForHandshake((req, res, next) => {
      if (req.user && req.user != "unauthorized") {
        next();
      } else {
        res.writeHead(404);
        res.end();
      }
    })
  );
  io.on("connection", (socket) => {
    socket.data.username = socket.request.user.username;
  });
}
export const getIo = (): Server => {
  return io;
};

export const createServer = (
  serverInstance: http.Server<
    typeof http.IncomingMessage,
    typeof http.ServerResponse
  >
) => {
  server = serverInstance;
  io = new Server(server, {
    cors: { origin: ["http://localhost:5173"], credentials: true },
  });
  setup();
  roomSetup(io);
  gameSetup(io);
  return io;
};
