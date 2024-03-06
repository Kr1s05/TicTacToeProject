import { Server, Socket } from "socket.io";
import { Board } from "../logic/gameLogic";
import { saveRoomToSession, setupRoomListeners } from "./roomSocket";
import { randomUUID } from "crypto";
import { cleanGameListeners, setGameListeners } from "../gameSocket";

const rooms: RoomList = {};
const botRooms: BotRoomList = {};
let io: Server;

export function setup(ioInstance: Server) {
  io = ioInstance;
  io.on("connection", (socket) => {
    setupRoomListeners(socket);
  });
}

export function getRoom(roomId: string): Room | BotRoom {
  return rooms[roomId] || botRooms[roomId];
}

export function createRoom(player: User) {
  if (player.socket.data.room && player.socket.data.room != "bot") return;
  if (player.socket.data.room == "bot") {
    const room: BotRoom = {
      roomId: randomUUID(),
      players: {
        player1: { ...player, playerChar: "x" },
        player2: { username: "Bot" },
      },
      board: new Array(9).fill(""),
      turn: "x",
    };
    botRooms[room.roomId] = room;
    joinBotRoom(room);
  } else {
    const room: Room = {
      roomId: randomUUID(),
      players: {
        player1: { ...player, connected: false, playerChar: "x" },
        player2: {
          username: "",
          socket: Socket.prototype,
          connected: false,
          playerChar: "",
        },
      },
      board: new Array(9).fill(""),
      isWaiting: true,
      turn: "x",
    };
    rooms[room.roomId] = room;
    joinRoom(room, player);
    sendAddRoom(room);
  }
}

export function joinRoomById(roomId: string, player: User) {
  joinRoom(rooms[roomId], player);
}

export function getDisplayRooms() {
  return Object.values(rooms)
    .filter((obj) => obj.isWaiting)
    .map((obj) => {
      return {
        id: obj.roomId,
        player: obj.players.player1.username,
        name: obj.players.player1.username + "'s room",
      };
    });
}

export function removeRoom(room: Room) {
  removeSocketRoom(room.players.player1.socket);
  if (!room.isWaiting) removeSocketRoom(room.players.player2.socket);
  sendRemoveRoom(room.roomId);
  delete rooms[room.roomId];
}

export function leaveRoomById(player: User) {
  if (!player.socket.data.room) return;
  if (player.socket.data.room in botRooms)
    leaveBotRoom(botRooms[player.socket.data.room]);
  else leaveRoom(rooms[player.socket.data.room], player);
}

export function rejoin(player: User, roomId: string) {
  const room = rooms[roomId];
  if (!room) return;
  setGameListeners(player.socket);
  setSocketRoom(player.socket, roomId);
  sendJoinRoom(player.socket, room);
  if (!room.isWaiting) {
    if (isPlayerOne(player.username, room)) {
      room.players.player1.connected = true;
    } else {
      room.players.player2.connected = true;
    }
  }
}

export function disconnectPlayer(player: User) {
  if (!player.socket.data.room) return;
  if (player.socket.data.room in botRooms) {
    leaveBotRoom(botRooms[player.socket.data.room]);
    return;
  }
  const room = rooms[player.socket.data.room];
  if (isPlayerOne(player.username, room)) {
    room.players.player1.connected = false;
  } else {
    room.players.player2.connected = false;
  }
  if (room.isWaiting) {
    removeRoom(room);
  } else {
    saveRoomToSession(player.socket);
  }
}

export function resetRoom(room: Room | BotRoom) {
  resetBoard(room);
  switchPlayers(room);
}

function leaveRoom(room: Room, player: User) {
  removeSocketRoom(player.socket);
  cleanGameListeners(player.socket);
  if (!room.isWaiting) {
    room.isWaiting = true;
    if (isPlayerOne(player.username, room)) {
      switchPlayers(room);
      if (!room.players.player1.connected) {
        removeRoom(room);
        return;
      }
    }
    resetBoard(room);
    removePlayer2(room);
    sendPlayerLeft(room.roomId);
    sendAddRoom(room);
  } else {
    removeRoom(room);
  }
}

function leaveBotRoom(room: BotRoom) {
  removeSocketRoom(room.players.player1.socket);
  cleanGameListeners(room.players.player1.socket);
  delete botRooms[room.roomId];
}

function joinBotRoom(room: BotRoom) {
  setSocketRoom(room.players.player1.socket, room.roomId);
  sendJoinBotRoom(room);
  setGameListeners(room.players.player1.socket);
}
function joinRoom(room: Room, player: User) {
  if (player.socket.data.room) return;
  if (!isPlayerOne(player.username, room)) {
    if (!room.isWaiting) return;
    room.players.player2 = { ...player, connected: true, playerChar: "o" };
    room.isWaiting = false;
    sendPlayerJoined(room.players.player1.socket, player.username);
    sendRemoveRoom(room.roomId);
  } else {
    room.players.player1.connected = true;
  }
  setSocketRoom(player.socket, room.roomId);
  setGameListeners(player.socket);
  sendJoinRoom(player.socket, room);
}

function setSocketRoom(socket: Socket, roomId: string) {
  socket.data.room = roomId;
  socket.join(roomId);
  saveRoomToSession(socket);
}

function removeSocketRoom(socket: Socket) {
  socket.leave(socket.data.room);
  socket.data.room = "";
  saveRoomToSession(socket);
}

function isPlayerOne(username: string, room: Room) {
  return room.players.player1.username == username;
}

function resetBoard(room: Room | BotRoom) {
  room.turn = "x";
  room.board = Array(9).fill("");
  sendResetBoard(room.roomId);
}

function switchPlayers(room: Room | BotRoom) {
  if ("isWaiting" in room) {
    const temp = room.players.player1;
    room.players.player1 = room.players.player2;
    room.players.player2 = temp;
    room.players.player1.playerChar = "x";
    room.players.player2.playerChar = "o";
    sendSwitchPlayers(room.players.player1.socket);
    sendSwitchPlayers(room.players.player2.socket);
  } else {
    room.players.player1.playerChar =
      room.players.player1.playerChar == "x" ? "o" : "x";
    sendSwitchPlayers(room.players.player1.socket);
  }
}

function removePlayer2(room: Room) {
  room.players.player2 = {
    username: "",
    socket: Socket.prototype,
    connected: false,
    playerChar: "",
  };
}

function sendJoinBotRoom(room: BotRoom) {
  room.players.player1.socket.emit("joined", {
    id: room.roomId,
    started: true,
    board: room.board,
    playerChar: room.players.player1.playerChar,
    player2: "Bot",
    turn: room.turn,
  });
}

function sendJoinRoom(socket: Socket, room: Room) {
  const player = isPlayerOne(socket.data.username, room)
    ? room.players.player1
    : room.players.player2;
  socket.emit("joined", {
    id: room.roomId,
    started: !room.isWaiting,
    board: room.board,
    playerChar: player.playerChar,
    player2: isPlayerOne(socket.data.username, room)
      ? room.players.player2.username
      : room.players.player1.username,
    turn: room.turn,
  });
}

function sendPlayerLeft(roomId: string) {
  io.to(roomId).emit("playerLeft");
}

function sendResetBoard(roomId: string) {
  io.to(roomId).emit("resetBoard");
}

function sendSwitchPlayers(socket: Socket) {
  socket.emit("switchPlayers");
}

function sendRemoveRoom(roomId: string) {
  io.emit("removeRoom", roomId);
}

function sendPlayerJoined(socket: Socket, username: string) {
  socket.emit("playerJoined", {
    username,
  });
}

function sendAddRoom(room: Room) {
  io.emit("addRoom", {
    id: room.roomId,
    player: room.players.player1.username,
    name: room.players.player1.username + "'s room",
  });
}

type RoomList = { [key: string]: Room };
type BotRoomList = { [key: string]: BotRoom };

export type BotRoom = {
  roomId: string;
  players: {
    player1: User & { playerChar: string };
    player2: { username: "Bot" };
  };
  board: Board;
  turn: "x" | "o";
};

export type Room = {
  roomId: string;
  players: {
    player1: User & { connected: boolean; playerChar: string };
    player2: User & { connected: boolean; playerChar: string };
  };
  board: Board;
  isWaiting: boolean;
  turn: "x" | "o";
};

export type User = {
  username: string;
  socket: Socket;
};
