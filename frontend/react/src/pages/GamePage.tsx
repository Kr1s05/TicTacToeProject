import GameBoard from "@/components/GameBoard";
import RoomList from "@/components/RoomList";
import { Button } from "@/components/ui/button";
import { useGameSocket } from "@/hooks/useGameSocket";
import { useRoomSocket } from "@/hooks/useRoomSocket";
function GamePage() {
  const {
    createRoom,
    leaveRoom,
    roomList,
    joinRoom,
    error,
    room,
    socket,
    started,
    startBoard,
    playerChar,
    player2,
    turn: startTurn,
  } = useRoomSocket();
  const { moveFn, board, playing, message } = useGameSocket(
    socket,
    startBoard,
    playerChar,
    player2,
    startTurn
  );
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
        <GameBoard
          board={board}
          moveFn={moveFn}
          started={started}
          myTurn={playing}
        />
        <Button className="w-fit m-4 text-xl" onClick={leaveRoom}>
          Leave
        </Button>
      </main>
    );
}

export default GamePage;
