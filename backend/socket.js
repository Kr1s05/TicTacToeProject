const { Server } = require("socket.io");
const onlyForHandshake = require("./middleware/socketMiddleware");
const { passport } = require("./authentication");
const sessionMiddleware = require("./middleware/sessionMiddleware");
let server, io;

function setup() {
  io.engine.use(onlyForHandshake(sessionMiddleware));
  io.engine.use(onlyForHandshake(passport.session()));
  io.engine.use(
    onlyForHandshake((req, res, next) => {
      if (req.user) {
        next();
      } else {
        res.writeHead(401);
        res.end();
      }
    })
  );

  io.on("connection", (socket) => {
    console.log(socket.request.user);
  });
}

module.exports = {
  createServer: (serverInstance) => {
    server = serverInstance;
    io = new Server(server, {
      cors: { origin: ["http://localhost:5173"] },
    });
    setup();
    return io;
  },
  io,
};
