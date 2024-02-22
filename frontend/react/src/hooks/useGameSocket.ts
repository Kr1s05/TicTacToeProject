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
    gameState: "win" | "loss" | "draw" | "play" | "wait";
    player2: string;
  }>({
    board: startBoard,
    turn,
    myChar: playerChar,
    gameState: "wait",
    player2,
    message: "",
  });

  useEffect(() => {
    console.log(state);
  });

  useEffect(() => {
    setState((prevState) => ({
      ...prevState,
      board: startBoard,
      myChar: playerChar,
      turn,
    }));
  }, [startBoard, playerChar, turn]);

  useEffect(() => {
    setState((prevState) => ({
      ...prevState,
      player2,
      gameState: player2 ? "play" : "wait",
    }));
  }, [player2]);

  useEffect(() => {
    socket.on("switchPlayers", () => {
      setState((prevState) => ({
        ...prevState,
        myChar: prevState.myChar == "x" ? "o" : "x",
      }));
    });
    socket.on("resetBoard", () => {
      setState((prevState) => ({
        ...prevState,
        board: Array(9).fill(""),
        turn: "x",
        gameState: "play",
      }));
    });
    socket.on(
      "move",
      ({ player, index }: { player: string; index: number }) => {
        setState((prevState) => ({
          ...prevState,
          board: prevState.board.map((c, i) => (index == i ? player : c)),
          turn: player == "x" ? "o" : "x",
          // message:
          //   (player == "x" ? "o" : "x") == prevState.myChar
          //     ? "Your turn."
          //     : prevState.player2 + "'s turn.",
        }));
      }
    );
    socket.on("win", ({ username }) => {
      setState((prevState) => ({
        ...prevState,
        gameState: username == prevState.player2 ? "loss" : "win",
      }));
    });
    socket.on("draw", () => {
      setState((prevState) => ({
        ...prevState,
        gameState: "draw",
      }));
    });
  }, [socket]);
  useEffect(() => {
    setMessage();
  }, [state.player2, state.myChar, state.turn, state.gameState]);
  const setMessage = () => {
    let message = "";
    switch (state.gameState) {
      case "win":
        message = "You win!";
        break;
      case "loss":
        message = state.player2 + " wins!";
        break;
      case "draw":
        message = "Draw.";
        break;
      case "wait":
        message = "Waiting for other player.";
        break;
      case "play":
        message =
          state.myChar == state.turn
            ? "Your turn."
            : state.player2 + "'s turn.";
    }
    setState((prevState) => ({
      ...prevState,
      message,
    }));
  };
  const moveFn = (index: number) => {
    socket.emit("makeMove", index);
  };
  return {
    moveFn,
    board: state.board,
    playing: state.myChar == state.turn && state.gameState == "play",
    message: state.message,
  };
}
