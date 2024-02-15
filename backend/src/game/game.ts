import { Server } from "socket.io";
import { User, rooms, updateRoomIndex } from "./room/gameRoom";
import { getGameState, isValidMove } from "./logic/gameLogic";

let io: Server;

export function setup(ioInstance: Server) {
  io = ioInstance;
}

export function makeMove(moveIndex: number, player: User) {
  const room = rooms[player.socket.data.index];
  if (room.roomId != player.socket.data.room) {
    updateRoomIndex(player);
    return makeMove(moveIndex, player);
  }
  if (!isValidMove(moveIndex, room.board)) return;
  const move = player.username == room.players.player1.username ? "x" : "o";
  sendMove(moveIndex, move, room.roomId);
  const gameState = getGameState(room.board);
  switch (gameState) {
    case "x":
      sendWin(room.players.player1.username, room.roomId);
      break;
    case "o":
      sendWin(room.players.player2.username, room.roomId);
      break;
    case "draw":
      sendDraw(room.roomId);
      break;
  }
}

function sendMove(index: number, move: "x" | "o", roomId: string) {
  io.to(roomId).emit("move", { player: move, index });
}

function sendWin(username: string, roomId: string) {
  io.to(roomId).emit("win", { username });
}

function sendDraw(roomId: string) {
  io.to(roomId).emit("draw");
}
