import { Button } from "./ui/button";
import { Circle, X } from "./GameIcons";
function GameBoard(props: { board: Array<string> }) {
  return (
    <div className="grid grid-cols-3 grid-rows-3 w-fit self-center my-auto">
      {props.board.map((char, index) => (
        <Button
          key={index}
          variant={"ghost"}
          className="size-32 aspect-square border border-white rounded-sm"
        >
          {char ? char == "X" ? <X /> : <Circle /> : ""}
        </Button>
      ))}
    </div>
  );
}

export default GameBoard;
