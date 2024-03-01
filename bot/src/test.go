package main

func main() {
	board := [9]string{
		"x", "", "",
		"x", "o", "o",
		"o", "", "x",
	}
	turn := "o"
	bestMove := findBestMove(board, turn)
	println("Best move is", turn, bestMove)
}
