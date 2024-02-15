import GameBoard from "@/components/GameBoard";
import RoomList from "@/components/RoomList";
import { Button } from "@/components/ui/button";
import { useRoomSocket } from "@/hooks/useGameSocket";
function GamePage() {
  const { createRoom, roomList, joinRoom, error, room } = useRoomSocket();

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
      <main className="flex flex-col h-[calc(100vh-80px-56px)]">
        <GameBoard board={["X", "O", "", "", "X", "", "O", "", "X"]} />
      </main>
    );
}

export default GamePage;
