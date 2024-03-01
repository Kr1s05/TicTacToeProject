package main

import (
	"math"
)

func minimax(board [9]string, maximizing bool, alpha int, beta int) int {
	playing, score := getGameState(board)
	if !playing {
		return score
	}
	if maximizing {
		maxValue := math.MinInt
		for i := range 9 {
			if board[i] != "" {
				continue
			}
			board[i] = "x"
			currentScore := minimax(board, false, alpha, beta)
			board[i] = ""
			maxValue = max(maxValue, currentScore)
			alpha = max(alpha, currentScore)
			if beta <= alpha {
				break
			}
		}
		return maxValue
	} else {
		minValue := math.MaxInt
		for i := range 9 {
			if board[i] != "" {
				continue
			}
			board[i] = "o"
			currentScore := minimax(board, true, alpha, beta)
			board[i] = ""
			minValue = min(minValue, currentScore)
			beta = min(beta, currentScore)
			if beta <= alpha {
				break
			}
		}
		return minValue
	}
}

func findBestMove(board [9]string, turn string) int {
	var bestMove int
	if turn == "x" {
		bestScore := math.MinInt
		for i := range 9 {
			if board[i] != "" {
				continue
			}
			board[i] = turn
			moveScore := minimax(board, false, math.MinInt, math.MaxInt)
			board[i] = ""
			if moveScore > bestScore {
				bestScore = moveScore
				bestMove = i
			}
		}
	} else {
		bestScore := math.MaxInt
		for i := range 9 {
			if board[i] != "" {
				continue
			}
			board[i] = turn
			moveScore := minimax(board, true, math.MinInt, math.MaxInt)
			board[i] = ""
			if moveScore < bestScore {
				bestScore = moveScore
				bestMove = i
			}
		}
	}
	return bestMove
}

func getGameState(board [9]string) (bool, int) {
	if board[4] != "" {
		if board[1] == board[4] && board[7] == board[4] {
			return false, getScore(board[4])
		}
		if board[3] == board[4] && board[5] == board[4] {
			return false, getScore(board[4])
		}
		if board[0] == board[4] && board[8] == board[4] {
			return false, getScore(board[4])
		}
		if board[2] == board[4] && board[6] == board[4] {
			return false, getScore(board[4])
		}
	}
	if board[0] != "" {
		if board[1] == board[0] && board[2] == board[0] {
			return false, getScore(board[0])
		}
		if board[3] == board[0] && board[6] == board[0] {
			return false, getScore(board[0])
		}
	}
	if board[8] != "" {
		if board[6] == board[8] && board[7] == board[8] {
			return false, getScore(board[8])
		}
		if board[2] == board[8] && board[5] == board[8] {
			return false, getScore(board[8])
		}
	}
	for _, e := range board {
		if e == "" {
			return true, 0
		}
	}
	return false, 0
}

func getScore(char string) int {
	if char == "x" {
		return 1
	}
	return -1
}
