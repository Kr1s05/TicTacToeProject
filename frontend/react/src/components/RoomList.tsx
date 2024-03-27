import { ScrollArea } from "./ui/scroll-area";
import GameRoom from "./GameRoom";
import { roomData } from "@/api/roomApi";
function RoomList(props: {
  rooms: Array<roomData>;
  joinFn: (id: string) => void;
}) {
  return (
    <div className="grow flex flex-col justify-center">
      <h1 className="text-3xl font-bold text-center m-2">Rooms:</h1>
      <ScrollArea className="w-fit md:w-2/3 self-center grow">
        <div className="p-4 flex flex-col gap-2">
          {props.rooms.length != 0 ? (
            props.rooms.map(({ id, name, player }) => (
              <GameRoom
                id={id}
                name={name}
                playerName={player}
                key={id}
                joinFn={props.joinFn}
              />
            ))
          ) : (
            <h4 className="self-center text-2xl text-center">
              No rooms available now.
            </h4>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}

export default RoomList;
