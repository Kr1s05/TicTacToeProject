import { getRooms } from "@/api/roomApi";
import { UserContext } from "@/components/UserProvider";
import { useQuery } from "@tanstack/react-query";
import { useContext, useEffect } from "react";
import { io } from "socket.io-client";
function RoomPage() {
  // const roomList = useQuery({
  //   queryKey: ["rooms"],
  //   queryFn: getRooms,
  // });

  useEffect(() => {
    const socket = io("ws://localhost:3000/", { withCredentials: true });
    socket.onAny((event, ...args) => {
      console.log(event, args);
    });
    // This effect runs once when the component is mounted
    socket.emit("hello");

    // Clean up the socket connection when the component unmounts
    return () => {
      socket.disconnect();
    };
  }, []);
  return <></>;
}

export default RoomPage;
