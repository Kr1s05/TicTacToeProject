import { useEffect, useState } from "react";
import { Socket } from "socket.io-client";

export function useGameSocket(
  socket: Socket,
  startBoard: Array<string>,
  playerChar: string,
  player2: string,
  turn: string
) {
  const [state, setState] = useState<{
    board: Array<string>;
    turn: string;
    myChar: string;
    message: string;
    ended: boolean;
    player2: string;
  }>({
    board: startBoard,
    turn,
    myChar: playerChar,
    ended: false,
    player2,
    message: "",
  });
  useEffect(() => {
    setState((prevState) => ({
      ...prevState,
      board: startBoard,
      myChar: playerChar,
      player2,
      turn,
    }));
    setMessage();
  }, [startBoard, playerChar, player2, turn]);

  useEffect(() => {
    socket.on("switchPlayers", () => {
      setState((prevState) => ({
        ...prevState,
        myChar: prevState.myChar == "x" ? "o" : "x",
      }));
      setMessage();
    });
    socket.on("resetBoard", () => {
      setState((prevState) => ({
        ...prevState,
        board: Array(9).fill(""),
        turn: "x",
      }));
      setMessage();
    });
    socket.on(
      "move",
      ({ player, index }: { player: string; index: number }) => {
        setState((prevState) => ({
          ...prevState,
          board: prevState.board.map((c, i) => (index == i ? player : c)),
          turn: player == "x" ? "o" : "x",
          message:
            (player == "x" ? "o" : "x") == prevState.myChar
              ? "Your turn."
              : prevState.player2 + "'s turn.",
        }));
      }
    );
    socket.on("win", ({ username }) => {
      setState((prevState) => ({
        ...prevState,
        message: username + " wins!",
        ended: true,
      }));
    });
    socket.on("draw", () => {
      setState((prevState) => ({
        ...prevState,
        message: "Draw!",
        ended: true,
      }));
    });
  }, [socket]);

  const setMessage = () => {
    setState((prevState) => ({
      ...prevState,
      message:
        prevState.player2 != ""
          ? prevState.myChar == prevState.turn
            ? "Your turn."
            : prevState.player2 + "'s turn."
          : "Waiting for other player.",
    }));
  };

  const moveFn = (index: number) => {
    socket.emit("makeMove", index);
  };
  return {
    moveFn,
    board: state.board,
    playing: state.myChar == state.turn && !state.ended,
    message: state.message,
  };
}
