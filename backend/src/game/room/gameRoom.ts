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
      player1: { ...player, connected: false },
      player2: { username: "", socket: Socket.prototype, connected: false },
    },
    board: new Array(9).fill(""),
    isWaiting: true,
    turn: "x",
  };
  rooms.push(room);
  joinRoom(room, player);
  io.emit("addRoom", {
    id: room.roomId,
    player: player.username,
    name: player.username + "'s room",
  });
}

export function rejoin(player: User) {
  updateRoomIndex(player);
  setGameListeners(player.socket);
  const room = rooms[player.socket.data.index];
  const playerChar =
    room.players.player1.username == player.username ? "x" : "o";
  player.socket.join(room.roomId);
  if (!room.isWaiting) {
    if (playerChar == "x") {
      room.players.player1.connected = true;
      room.players.player2.socket.emit("playerJoined", {
        username: player.username,
      });
    } else {
      room.players.player2.connected = true;
      room.players.player1.socket.emit("playerJoined", {
        username: player.username,
      });
    }
  }
  player.socket.emit("joined", {
    id: room.roomId,
    started: !room.isWaiting,
    board: room.board,
    playerChar,
    player2:
      playerChar == "x"
        ? room.players.player2.username
        : room.players.player1.username,
    turn: room.turn,
  });
}

export function joinRoom(room: Room, player: User) {
  let playerChar = "x";
  if (player.socket.data.room) return;
  if (room.players.player1.username != player.username) {
    if (!room.isWaiting) throw new Error("Room is full.");
    room.players.player2 = { ...player, connected: true };
    playerChar = "o";
    room.isWaiting = false;
    room.players.player1.socket.emit("playerJoined", {
      username: player.username,
    });
    io.emit("removeRoom", room.roomId);
  } else {
    room.players.player1.connected = true;
  }
  player.socket.data.room = room.roomId;
  player.socket.data.index = rooms.indexOf(room);
  player.socket.join(room.roomId);
  saveRoomToSession(player.socket);
  setGameListeners(player.socket);
  player.socket.emit("joined", {
    id: room.roomId,
    started: !room.isWaiting,
    board: room.board,
    playerChar,
    player2:
      playerChar == "x"
        ? room.players.player2.username
        : room.players.player1.username,
    turn: room.turn,
  });
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

export function leaveRoomById(player: User) {
  if (!player.socket.data.room) return;
  const room = rooms[player.socket.data.index];
  if (!room || !room.roomId == player.socket.data.room) {
    updateRoomIndex(player);
    return leaveRoomById(player);
  }
  leaveRoom(room, player);
}

export function removeRoom(room: Room) {
  const index = rooms.indexOf(room);
  if (index > -1) rooms.splice(index, 1);
  else throw new Error("room does not exist");
  room.players.player1.socket.data.room = "";
  saveRoomToSession(room.players.player1.socket);
  if (!room.isWaiting) {
    room.players.player2.socket.data.room = "";
    saveRoomToSession(room.players.player2.socket);
  }
  io.emit("removeRoom", room.roomId);
}

export function leaveRoom(room: Room, player: User) {
  player.socket.data.room = "";
  player.socket.leave(room.roomId);
  saveRoomToSession(player.socket);
  cleanGameListeners(player.socket);
  if (!room.isWaiting) {
    player.socket
      .to(room.roomId)
      .emit("playerLeft", player.username + " left.");
    room.isWaiting = true;
    room.board = Array(9).fill("");
    room.turn = "x";
    if (room.players.player1.username == player.username) {
      room.players.player1 = room.players.player2;
      room.players.player1.socket.emit("switchPlayers");
    }
    room.players.player2 = {
      username: "",
      socket: Socket.prototype,
      connected: false,
    };
    io.emit("addRoom", {
      id: room.roomId,
      player: room.players.player1.username,
      name: room.players.player1.username + "'s room",
    });
    io.to(room.roomId).emit("resetBoard");
  } else {
    removeRoom(room);
  }
}

export function disconnectPlayer(player: User) {
  if (!player.socket.data.room) return;
  const room = rooms[player.socket.data.index];
  if (
    !room ||
    (room.players.player1.username != player.username &&
      room.players.player2.username != player.username)
  ) {
    updateRoomIndex(player);
    return disconnectPlayer(player);
  }
  if (room.players.player1.username == player.username) {
    room.players.player1.connected = false;
  } else {
    room.players.player2.connected = false;
  }
  if (
    room.isWaiting ||
    (!room.players.player1.connected && !room.players.player2.connected)
  ) {
    removeRoom(room);
  }
}

export function updateRoomIndex(player: User) {
  if (player.socket.data.room == rooms[player.socket.data.index]) return;
  const room = findById(player.socket.data.room);
  player.socket.data.index = rooms.indexOf(room);
}

export function resetRoom(room: Room) {
  room.board = new Array(9);
  room.turn = "x";
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
    player1: User & { connected: boolean };
    player2: User & { connected: boolean };
  };
  board: Board;
  isWaiting: boolean;
  turn: "x" | "o";
};
export type User = {
  username: string;
  socket: Socket;
};
