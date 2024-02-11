import RoomList from "@/components/RoomList";
import { Button } from "@/components/ui/button";
import { useRoomSocket } from "@/hooks/useGameSocket";
function GamePage() {
  const { createRoom, roomList, joinRoom, error } = useRoomSocket();
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
}

export default GamePage;
