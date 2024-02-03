import { getRooms } from "@/api/roomApi";
import { UserContext } from "@/components/UserProvider";
import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { io } from "socket.io-client";
function RoomPage() {
  const user = useContext(UserContext);
  const roomList = useQuery({
    queryKey: ["rooms"],
    queryFn: getRooms,
  });
  if (!user || "message" in user) return "loading";
  const socket = io("ws://localhost:3000/", { autoConnect: false });
  socket.auth = { username: user.username };
  socket.connect();
  socket.onAny((event, ...args) => {
    console.log(event, args);
  });
  console.log(roomList.data);
  return <>{JSON.stringify(roomList.data)}</>;
}

export default RoomPage;
