import { Button } from "./ui/button";
import { Circle, X } from "./GameIcons";
function GameBoard(props: {
  board: Array<string>;
  moveFn: (index: number) => void;
  myTurn: boolean;
}) {
  return (
    <div className="grid grid-cols-3 grid-rows-3 w-fit self-center my-auto">
      {props.board.map((char, index) => (
        <Button
          key={index}
          variant={"ghost"}
          onClick={() => {
            props.moveFn(index);
          }}
          disabled={char == "x" || char == "o" || !props.myTurn}
          className="size-24 sm:size-32 aspect-square border border-white rounded-sm"
        >
          {char ? char == "x" ? <X /> : <Circle /> : ""}
        </Button>
      ))}
    </div>
  );
}

export default GameBoard;
