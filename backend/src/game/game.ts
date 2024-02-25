import { Server } from "socket.io";
import { User, getRoom, resetRoom } from "./room/gameRoom";
import { getGameState, isValidMove } from "./logic/gameLogic";
import { setTimeout } from "timers/promises";
let io: Server;

export function setup(ioInstance: Server) {
  io = ioInstance;
}

export async function makeMove(moveIndex: number, player: User) {
  const room = getRoom(player.socket.data.room);
  if (!isValidMove(moveIndex, room.board)) return;
  const move = player.username == room.players.player1.username ? "x" : "o";
  if (room.turn != move) return;
  room.board[moveIndex] = move;
  room.turn = move == "x" ? "o" : "x";
  sendMove(moveIndex, move, room.roomId);
  const gameState = getGameState(room.board);
  switch (gameState) {
    case "playing":
      return;
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
  await setTimeout(3000);
  resetRoom(room);
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
