import { Socket } from "socket.io";
import { makeMove } from "./game";

export function setGameListeners(socket: Socket) {
  const username = socket.data.username;
  socket.on("makeMove", (index: number) => {
    makeMove(index, { username, socket });
  });
}
export function cleanGameListeners(socket: Socket) {
  socket.removeAllListeners("makeMove");
}
