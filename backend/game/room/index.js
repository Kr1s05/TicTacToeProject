const rooms = [];
let io;
module.exports = function setSocketIO(ioInstance) {
  io = ioInstance;
  return { createRoom, getRooms };
};

function createRoom(roomId, player) {
  rooms.push({
    roomId,
    players: [player],
    board: Array(9).fill(null),
    turn: x,
  });
}

function getRooms() {
  return rooms.map((element) => {
    return { roomId: element.roomId, roomName: player.username + "'s room" };
  });
}
