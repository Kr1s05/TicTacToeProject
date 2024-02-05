import { randomUUID } from "crypto";
import { Socket } from "socket.io";
import { getIo } from "@/socket/socket";

const rooms: Array<Room> = [];
const io = getIo();

function createRoom(player: User) {
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
    player1: player,
    name: player.username + "'s room",
  });
}

function joinRoom(room: Room, player: User) {
  if (room.players.player1 != player) {
    if (!room.isWaiting) throw new Error("Room is full.");
    room.players.player2 = player;
    room.isWaiting = false;
    io.emit("removeRoom", room.roomId);
  }
  player.socket.data.room = room.roomId;
  player.socket.join(room.roomId);
  player.socket.emit("joined", { id: room.roomId });
}

function joinRoomById(roomId: string, player: User) {
  const room = findById(roomId);
  joinRoom(room, player);
}

function findById(roomId: string) {
  const room = rooms.find((obj) => obj.roomId === roomId);
  if (!room) throw new Error("Room not found.");
  return room;
}

function getDisplayRooms() {
  return rooms
    .filter((obj) => obj.isWaiting)
    .map((obj) => {
      return {
        id: obj.roomId,
        player1: obj.players.player1,
        name: obj.players.player1.username + "'s room",
      };
    });
}

function leaveRoomById(roomId: string, player: User) {
  const room = findById(roomId);
  leaveRoom(room, player);
}

function removeRoom(room: Room) {
  const index = rooms.indexOf(room);
  if (index > -1) rooms.splice(index, 1);
  else throw new Error("room does not exist");
  io.emit("removeRoom", room.roomId);
}

function leaveRoom(room: Room, player: User) {
  player.socket.data.room = "";
  player.socket.leave(room.roomId);
  if (!room.isWaiting) {
    player.socket
      .to(room.roomId)
      .emit("playerLeft", player.username + " left.");
    room.isWaiting = true;
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

type Room = {
  roomId: string;
  players: {
    player1: User;
    player2: User | "waiting";
  };
  board: Array<boardSpace>;
  isWaiting: boolean;
};
type User = {
  username: string;
  socket: Socket;
};
type boardSpace = "x" | "o" | undefined;

export { createRoom, joinRoomById, getDisplayRooms, leaveRoomById, rooms };
