import { Server } from "socket.io";
import { User, getRoom, resetRoom } from "./room/gameRoom";
import { getGameState, isValidMove } from "./logic/gameLogic";
import { setTimeout } from "timers/promises";
import { BotMessage, setupBotMessaging } from "./botMessaging";
import { incrementScore } from "./incrementScores";
let io: Server;
export let sendBotMove: (msg: BotMessage) => void;
export async function setup(ioInstance: Server) {
  io = ioInstance;
  sendBotMove = await setupBotMessaging();
}

export async function makeMove(
  moveIndex: number,
  player: User | { username: "Bot"; roomId: string; socket: undefined }
) {
  let room;
  if (!player.socket) room = getRoom(player.roomId);
  else room = getRoom(player.socket.data.room);
  if (!isValidMove(moveIndex, room.board)) return;
  let move;
  if ("isWaiting" in room)
    move = player.username == room.players.player1.username ? "x" : "o";
  else {
    move = room.players.player1.playerChar;
    if (player.username == "Bot") move = move == "x" ? "o" : "x";
  }
  if (room.turn != move) return;
  room.board[moveIndex] = move;
  room.turn = move == "x" ? "o" : "x";
  sendMove(moveIndex, move, room.roomId);
  if (room.players.player2.username == "Bot" && player.username != "Bot")
    sendBotMove({ roomId: room.roomId, board: room.board, turn: room.turn });
  const gameState = getGameState(room.board);
  switch (gameState) {
    case "playing":
      return;
    case "x":
      if (room.players.player2.username == "Bot") {
        sendWin(
          room.players.player1.playerChar == "x"
            ? room.players.player1.username
            : "Bot",
          room.roomId
        );
        incrementScore(
          room.players.player1.username,
          room.players.player1.playerChar == "x" ? "bot_W" : "bot_L"
        );
      } else {
        sendWin(room.players.player1.username, room.roomId);
        incrementScore(room.players.player2.username, "pvp_L");
        incrementScore(room.players.player1.username, "pvp_W");
      }
      break;
    case "o":
      if (room.players.player2.username == "Bot") {
        sendWin(
          room.players.player1.playerChar == "o"
            ? room.players.player1.username
            : "Bot",
          room.roomId
        );
        incrementScore(
          room.players.player1.username,
          room.players.player1.playerChar == "o" ? "bot_W" : "bot_L"
        );
      } else {
        sendWin(room.players.player2.username, room.roomId);
        incrementScore(room.players.player1.username, "pvp_L");
        incrementScore(room.players.player2.username, "pvp_W");
      }
      break;
    case "draw":
      sendDraw(room.roomId);
      break;
  }
  await setTimeout(3000);
  resetRoom(room);
  if (
    room.players.player2.username == "Bot" &&
    room.players.player1.playerChar == "o"
  )
    sendBotMove({ roomId: room.roomId, board: room.board, turn: "x" });
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
