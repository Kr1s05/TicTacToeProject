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
    socket: Socket;
    roomList: Array<roomData>;
    room: string;
    started: boolean;
    error?: string | undefined;
  }>({ socket: Socket.prototype, roomList: [], room: "", started: false });
  useEffect(() => {
    const socket = io("ws://localhost:3000/", { withCredentials: true });
    socket.on("addRoom", (roomInfo: roomData) => {
      setState((prevState) => ({
        ...prevState,
        roomList: [...prevState.roomList, roomInfo],
      }));
    });

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

    socket.on("removeRoom", (roomId: string) => {
      setState((prevState) => ({
        ...prevState,
        roomList: prevState.roomList.filter((room) => room.id !== roomId),
      }));
    });

    socket.on("joined", ({ id, started }) => {
      setState((prevState) => ({ ...prevState, room: id, started: started }));
    });
    socket.on("playerJoined", () => {
      setState((prevState) => ({ ...prevState, started: true }));
    });

    setState((prevState) => ({ ...prevState, socket }));
    return () => {
      socket.disconnect();
    };
  }, []);
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

  const createRoom = () => {
    if (state.room) return;
    state.socket.emit("createRoom", "player");
  };
  const joinRoom = (id: string) => {
    if (state.room) return;
    state.socket.emit("joinRoom", id);
  };

  const leaveRoom = (roomId: string) => {
    if (!state.room) return;
    state.socket.emit("leaveRoom", roomId);
  };
  return {
    createRoom,
    roomList: state.roomList,
    joinRoom,
    leaveRoom,
    error: state.error,
    room: state.room,
    started: state.started,
  };
}
