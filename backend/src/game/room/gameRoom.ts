import { Server, Socket } from "socket.io";
import { Board } from "../logic/gameLogic";
import { saveRoomToSession, setupRoomListeners } from "./roomSocket";
import { randomUUID } from "crypto";
import { cleanGameListeners, setGameListeners } from "../gameSocket";

export const rooms: RoomList = {};
let io: Server;

export function setup(ioInstance: Server) {
  io = ioInstance;
  io.on("connection", (socket) => {
    setupRoomListeners(socket);
  });
}

export function getRoom(roomId: string) {
  return rooms[roomId];
}

export function createRoom(player: User) {
  if (player.socket.data.room) return;
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
  leaveRoom(rooms[player.socket.data.room], player);
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

export function resetRoom(room: Room) {
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

function resetBoard(room: Room) {
  room.turn = "x";
  room.board = Array(9).fill("");
  sendResetBoard(room.roomId);
}

function switchPlayers(room: Room) {
  const temp = room.players.player1;
  room.players.player1 = room.players.player2;
  room.players.player2 = temp;
  room.players.player1.playerChar = "x";
  room.players.player2.playerChar = "o";
  sendSwitchPlayers(room.players.player1.socket);
  sendSwitchPlayers(room.players.player2.socket);
}

function removePlayer2(room: Room) {
  room.players.player2 = {
    username: "",
    socket: Socket.prototype,
    connected: false,
    playerChar: "",
  };
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
