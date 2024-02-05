import { createRoom, joinRoomById, leaveRoomById } from "./gameRoom";
import { Socket } from "socket.io";

export function setupRoomListeners(socket: Socket) {
  socket.on("createRoom", (type: roomType) => {
    if (type == "bot") {
      createRoom({ username: socket.data.username, socket });
    }
  });
  socket.on("joinRoom", (roomId: string) => {
    joinRoomById(roomId, { username: socket.data.username, socket });
  });
  socket.on("leaveRoom", (roomId: string) => {
    leaveRoomById(roomId, { username: socket.data.username, socket });
  });
}

type roomType = "bot" | "player";
