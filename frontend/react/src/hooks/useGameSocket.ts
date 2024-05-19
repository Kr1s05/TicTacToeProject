import { useEffect, useState } from "react";
import { Socket, io } from "socket.io-client";
import { useQuery } from "@tanstack/react-query";
import { getRooms, roomData } from "@/api/roomApi";

export function useRoomSocket() {
  const { data, isError, isLoading } = useQuery({
    queryKey: ["rooms"],
    queryFn: getRooms,
  });
  const [state, setState] = useState<{
    //room info
    socket: Socket;
    roomList: Array<roomData>;
    room: string;
    error?: string;
    player2: string;
    //game info
    gameState: "win" | "loss" | "draw" | "play" | "wait";
    board: Array<string>;
    message: string;
    playerChar: string;
    turn: string;
  }>({
    socket: Socket.prototype,
    roomList: [],
    room: "",
    player2: "",
    gameState: "wait",
    board: [],
    message: "",
    playerChar: "",
    turn: "",
  });
  useEffect(() => {
    const socket = io("ws://localhost:3000/", { withCredentials: true });

    //handling errors and reconnection
    socket.io.on("error", () => {
      setState((prevState) => ({
        ...prevState,
        error: "Error connecting to backend.",
      }));
    });

    socket.io.on("reconnect", () => {
      setState((prevState) => ({
        ...prevState,
        error: undefined,
      }));
    });

    //room event listeners
    socket.on("addRoom", (roomInfo: roomData) => {
      setState((prevState) => ({
        ...prevState,
        roomList: [...prevState.roomList, roomInfo],
      }));
    });

    socket.on("removeRoom", (roomId: string) => {
      setState((prevState) => ({
        ...prevState,
        roomList: prevState.roomList.filter((room) => room.id !== roomId),
      }));
    });

    socket.on("joined", ({ id, started, board, playerChar, player2, turn }) => {
      setState((prevState) => ({
        ...prevState,
        room: id,
        gameState: started ? "play" : "wait",
        board: board,
        playerChar: playerChar,
        player2: player2,
        turn,
      }));
    });

    socket.on("playerJoined", ({ username }) => {
      setState((prevState) => ({
        ...prevState,
        gameState: "play",
        player2: username,
      }));
    });

    socket.on("playerLeft", () => {
      setState((prevState) => ({
        ...prevState,
        gameState: "wait",
        player2: "",
      }));
    });

    //game listeners
    socket.on("switchPlayers", () => {
      setState((prevState) => ({
        ...prevState,
        playerChar: prevState.playerChar == "x" ? "o" : "x",
      }));
    });
    socket.on("resetBoard", () => {
      setState((prevState) => ({
        ...prevState,
        board: Array(9).fill(""),
        turn: "x",
        gameState: prevState.gameState == "wait" ? "wait" : "play",
      }));
    });
    socket.on(
      "move",
      ({ player, index }: { player: string; index: number }) => {
        setState((prevState) => ({
          ...prevState,
          board: prevState.board.map((c, i) => (index == i ? player : c)),
          turn: player == "x" ? "o" : "x",
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

    setState((prevState) => ({ ...prevState, socket }));
    return () => {
      socket.disconnect();
    };
  }, []);

  //handling initial rooms loading
  useEffect(() => {
    if (!isLoading && !isError) {
      setState((prevState) => ({
        ...prevState,
        roomList: data || [],
      }));
    }
  }, [data, isError, isLoading]);

  if (isError && !isLoading)
    setState({ ...state, error: "Error connecting to backend." });

  //functions for the buttons
  const createRoom = (roomType: string) => {
    if (state.room) return;
    state.socket.emit("createRoom", roomType);
  };
  const joinRoom = (id: string) => {
    if (state.room) return;
    state.socket.emit("joinRoom", id);
  };
  const leaveRoom = () => {
    if (!state.room) return;
    setState((prevState) => ({ ...prevState, room: "", player2: "" }));
    state.socket.emit("leaveRoom");
  };
  const move = (index: number) => {
    state.socket.emit("makeMove", index);
  };
  //message
  useEffect(setMessage, [
    state.gameState,
    state.player2,
    state.playerChar,
    state.turn,
  ]);
  function setMessage() {
    let message = "";
    switch (state.gameState) {
      case "win":
        message = "Ти печелиш!";
        break;
      case "loss":
        message = state.player2 + " печели!";
        break;
      case "draw":
        message = "Равенство.";
        break;
      case "wait":
        message = "Изчакване на втори играч.";
        break;
      case "play":
        message =
          state.playerChar == state.turn
            ? "Ти си на ход."
            : state.player2 + " е на ход.";
    }
    setState((prevState) => ({
      ...prevState,
      message,
    }));
  }

  return {
    createRoom,
    joinRoom,
    leaveRoom,
    move,
    roomList: state.roomList,
    error: state.error,
    room: state.room,
    playing: state.playerChar == state.turn && state.gameState == "play",
    socket: state.socket,
    board: state.board,
    playerChar: state.playerChar,
    player2: state.player2,
    turn: state.turn,
    message: state.message,
  };
}
