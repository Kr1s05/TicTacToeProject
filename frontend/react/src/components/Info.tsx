export function Info() {
  return (
    <div key="1" className="w-full py-6 space-y-6">
      <div className="container space-y-2 text-center px-4">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
          Tic-Tac-Toe
        </h1>
        <p className="mx-auto max-w-3xl text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
          Tic-tac-toe is a classic game known for its simplicity. It's a game
          that's easy to learn, but challenging to master. Here's a guide to
          help you get started.
        </p>
      </div>
      <div className="container grid md:grid-cols-[200px_1fr] items-start gap-6 md:gap-12 lg:gap-24">
        <div className="grid grid-cols-3 items-center justify-center gap-2 text-center">
          <div className="text-4xl font-bold">X</div>
          <div className="text-4xl font-bold">O</div>
          <div className="text-4xl font-bold">X</div>
          <div className="text-4xl font-bold">O</div>
          <div className="text-4xl font-bold">X</div>
          <div className="text-4xl font-bold">O</div>
          <div className="text-4xl font-bold">X</div>
          <div className="text-4xl font-bold">O</div>
          <div className="text-4xl font-bold">X</div>
        </div>
        <div className="grid grid-cols-1 items-start gap-1 text-gray-500 dark:text-gray-400">
          <div>
            Player X starts the game by placing their mark in any of the 9
            squares.
          </div>
          <div>
            Player O then takes their turn, placing their mark in an empty
            square.
          </div>
          <div>
            The game continues with players taking turns until one player gets 3
            of their marks in a row (horizontally, vertically, or diagonally),
            or all 9 squares are filled without a winner, resulting in a draw.
          </div>
        </div>
      </div>
      <div className="container grid items-start gap-6 md:grid-cols-2 md:gap-12 lg:gap-24">
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">
            Tips and Strategies for Winning
          </h2>
          <div className="space-y-4 text-gray-500 dark:text-gray-400">
            <p>
              - Pay attention to your opponent's moves and block them from
              getting three in a row.
            </p>
            <p>
              - Look for opportunities to create your own winning lines while
              blocking your opponent.
            </p>
            <p>
              - The center square is a strategic starting position as it
              provides the most opportunities for creating winning lines.
            </p>
            <p>
              - If your opponent takes a corner square, taking the center is a
              good move to maintain control of the board.
            </p>
          </div>
        </div>
        <div>
          <h3>Contact information:</h3>
          <p className="pl-6">
            Email: support@tictactoe-online.bg
            <p />
          </p>
        </div>
      </div>
    </div>
  );
}
