import { Request } from "express";
import {
  createRoom,
  disconnectPlayer,
  joinRoomById,
  leaveRoomById,
  rejoin,
} from "./gameRoom";
import { Socket } from "socket.io";

export function setupRoomListeners(socket: Socket) {
  const req = socket.request as Request;
  socket.data.room = req.session.room;
  if (socket.data.room) {
    if (!socket.rooms.has(socket.data.room)) {
      rejoin({ username: socket.data.username, socket });
    }
  }
  socket.on("disconnecting", () => {
    disconnectPlayer({ username: socket.data.username, socket });
    saveRoomToSession(socket);
  });
  socket.on("createRoom", (type: roomType) => {
    if (type == "player") {
      createRoom({ username: socket.data.username, socket });
    }
  });
  socket.on("joinRoom", (roomId: string) => {
    joinRoomById(roomId, { username: socket.data.username, socket });
  });
  socket.on("leaveRoom", () => {
    leaveRoomById({ username: socket.data.username, socket });
  });
}

export function saveRoomToSession(socket: Socket) {
  const session = socket.request.session;
  session.reload(() => {
    session.room = socket.data.room;
    session.save();
  });
}

type roomType = "bot" | "player";
