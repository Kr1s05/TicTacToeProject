import GameBoard from "@/components/GameBoard";
import RoomList from "@/components/RoomList";
import { Button } from "@/components/ui/button";
import { useRoomSocket } from "@/hooks/useRoomSocket";
function GamePage() {
  const {
    createRoom,
    leaveRoom,
    joinRoom,
    move,
    roomList,
    error,
    room,
    playing,
    board,
    message,
  } = useRoomSocket();
  if (!room)
    return (
      <main className="flex flex-col h-[calc(100vh-80px-56px)]">
        {error ? (
          error
        ) : roomList ? (
          <>
            <RoomList rooms={roomList} joinFn={joinRoom} />
            <Button
              className="w-fit self-center m-4 text-xl"
              onClick={createRoom}
            >
              Create Room!
            </Button>
          </>
        ) : (
          "Loading..."
        )}
      </main>
    );
  else
    return (
      <main className="flex flex-col h-[calc(100vh-80px-56px)] items-center">
        <p className="text-center mt-4 text-2xl">{message}</p>
        <GameBoard board={board} moveFn={move} myTurn={playing} />
        <Button className="w-fit m-4 text-xl" onClick={leaveRoom}>
          Leave
        </Button>
      </main>
    );
}

export default GamePage;
