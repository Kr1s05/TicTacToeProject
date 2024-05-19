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
      <main className="flex flex-col h-[85vh]">
        {error ? (
          error
        ) : roomList ? (
          <div className="flex flex-row h-full justify-between p-2 sm:p-5 md:p-16 relative">
            <div className="flex flex-col grow">
              <RoomList rooms={roomList} joinFn={joinRoom} />
              <div className="flex flex-col md:flex-row justify-center">
                <Button
                  className="w-44 sm:w-52 m-4 sm:text-xl self-center"
                  onClick={() => createRoom("player")}
                >
                  Създай стая!
                </Button>
                <Button
                  className="w-44 sm:w-52 m-4 sm:text-xl self-center"
                  onClick={() => createRoom("bot")}
                >
                  Играй срещу бота!
                </Button>
              </div>
            </div>
          </div>
        ) : (
          "Зареждане..."
        )}
      </main>
    );
  else
    return (
      <main className="flex flex-col h-[88vh] items-center">
        <p className="text-center mt-4 text-2xl">{message}</p>
        <GameBoard board={board} moveFn={move} myTurn={playing} />
        <Button className="w-fit m-4 text-xl" onClick={leaveRoom}>
          Напускане
        </Button>
      </main>
    );
}

export default GamePage;
