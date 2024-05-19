function hasMoves(board: Board) {
  return board.includes("");
}

export function isValidMove(move: number, board: Board) {
  return !board[move];
}

export function getGameState(board: Board) {
  if (board[4]) {
    if (board[1] == board[4] && board[7] == board[4]) return board[4];
    if (board[3] == board[4] && board[5] == board[4]) return board[4];
    if (board[0] == board[4] && board[8] == board[4]) return board[4];
    if (board[2] == board[4] && board[6] == board[4]) return board[4];
  }
  if (board[0]) {
    if (board[1] == board[0] && board[2] == board[0]) return board[0];
    if (board[3] == board[0] && board[6] == board[0]) return board[0];
  }
  if (board[8]) {
    if (board[6] == board[8] && board[7] == board[8]) return board[8];
    if (board[2] == board[8] && board[5] == board[8]) return board[8];
  }
  if (hasMoves(board)) return "playing";
  return "draw";
}

export type Board = Array<"x" | "o" | "">;
export type GameState = "playing" | "draw" | "x" | "o";
