import { Button } from "./ui/button";
import { Circle, X } from "./GameIcons";
function GameBoard(props: {
  board: Array<string>;
  moveFn: () => void;
  started: boolean;
}) {
  return (
    <div className="grid grid-cols-3 grid-rows-3 w-fit self-center my-auto">
      {props.board.map((char, index) => (
        <Button
          key={index}
          variant={"ghost"}
          onClick={props.moveFn}
          disabled={!props.started}
          className="size-32 aspect-square border border-white rounded-sm"
        >
          {char ? char == "X" ? <X /> : <Circle /> : ""}
        </Button>
      ))}
    </div>
  );
}

export default GameBoard;
