import { Card, CardDescription, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
function GameRoom(props: {
  id: string;
  name: string;
  playerName: string;
  joinFn: (id: string) => void;
}) {
  return (
    <Card className="p-4 flex gap-2 mx-8">
      <div className="grow">
        <CardTitle>{props.name}</CardTitle>
        <CardDescription>Player:{props.playerName}</CardDescription>
      </div>
      <Button
        className="text-2xl"
        onClick={() => {
          props.joinFn(props.id);
        }}
      >
        Join
      </Button>
    </Card>
  );
}

export default GameRoom;
