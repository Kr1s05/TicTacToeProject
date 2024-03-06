import GameBoard from "@/components/GameBoard";
import RoomList from "@/components/RoomList";
import { Button } from "@/components/ui/button";
import { useRoomSocket } from "@/hooks/useGameSocket";
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
            <div className="flex flex-row justify-center">
              <Button
                className="w-40 m-4 text-xl self-center"
                onClick={() => createRoom("player")}
              >
                Create Room!
              </Button>
              <Button
                className="w-40 m-4 text-xl"
                onClick={() => createRoom("bot")}
              >
                Play vs Bot!
              </Button>
            </div>
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
