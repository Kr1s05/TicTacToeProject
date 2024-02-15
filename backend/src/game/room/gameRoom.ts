import { randomUUID } from "crypto";
import { Server, Socket } from "socket.io";
import { saveRoomToSession, setupRoomListeners } from "./roomSocket";
import { Board } from "../logic/gameLogic";
import { cleanGameListeners, setGameListeners } from "../gameSocket";

export const rooms: Array<Room> = [];
let io: Server;

export function setup(ioInstance: Server) {
  io = ioInstance;
  io.on("connection", (socket) => {
    setupRoomListeners(socket);
  });
}

export function createRoom(player: User) {
  if (player.socket.data.room) return;
  const room: Room = {
    roomId: randomUUID(),
    players: {
      player1: player,
      player2: "waiting",
    },
    board: new Array(9),
    isWaiting: true,
  };
  rooms.push(room);
  joinRoom(room, player);
  io.emit("addRoom", {
    id: room.roomId,
    player: player.username,
    name: player.username + "'s room",
  });
}

export function joinRoom(room: Room, player: User) {
  if (player.socket.data.room) return;
  if (room.players.player1 != player) {
    if (!room.isWaiting) throw new Error("Room is full.");
    room.players.player2 = player;
    room.isWaiting = false;
    room.players.player1.socket.emit("playerJoined", {
      username: player.username,
    });
    io.emit("removeRoom", room.roomId);
  }
  player.socket.data.room = room.roomId;
  player.socket.data.index = rooms.indexOf(room);
  player.socket.join(room.roomId);
  saveRoomToSession(player.socket);
  setGameListeners(player.socket);
  player.socket.emit("joined", { id: room.roomId });
}

export function joinRoomById(roomId: string, player: User) {
  const room = findById(roomId);
  joinRoom(room, player);
}

export function findById(roomId: string) {
  const room = rooms.find((obj) => obj.roomId === roomId);
  if (!room) throw new Error("Room not found.");
  return room;
}

export function getDisplayRooms() {
  return rooms
    .filter((obj) => obj.isWaiting)
    .map((obj) => {
      return {
        id: obj.roomId,
        player: obj.players.player1.username,
        name: obj.players.player1.username + "'s room",
      };
    });
}

export function leaveRoomById(roomId: string, player: User) {
  const room = findById(roomId);
  leaveRoom(room, player);
}

export function removeRoom(room: Room) {
  const index = rooms.indexOf(room);
  if (index > -1) rooms.splice(index, 1);
  else throw new Error("room does not exist");
  io.emit("removeRoom", room.roomId);
}

export function leaveRoom(room: Room, player: User) {
  player.socket.data.room = "";
  player.socket.data.index = undefined;
  player.socket.leave(room.roomId);
  saveRoomToSession(player.socket);
  cleanGameListeners(player.socket);
  if (!room.isWaiting) {
    player.socket
      .to(room.roomId)
      .emit("playerLeft", player.username + " left.");
    room.isWaiting = true;
    io.to(room.roomId).emit("playerLeft");
    io.emit("addRoom", {
      id: room.roomId,
      player1: player,
      name: player.username + "'s room",
    });
    if (room.players.player1 == player) {
      room.players.player1 = room.players.player2;
      room.players.player2 = "waiting";
    }
  } else {
    removeRoom(room);
  }
}

export function updateRoomIndex(player: User) {
  const room = findById(player.socket.data.room);
  player.socket.data.index = rooms.indexOf(room);
}

export function resetRoom(room: Room) {
  room.board = new Array(9);
  switchPlayers(room);
}

function switchPlayers(room: Room) {
  const temp = room.players.player1;
  room.players.player1 = room.players.player2;
  room.players.player2 = temp;
}

export type Room = {
  roomId: string;
  players: {
    player1: User;
    player2: User | "waiting";
  };
  board: Board;
  isWaiting: boolean;
};
export type User = {
  username: string;
  socket: Socket;
};
