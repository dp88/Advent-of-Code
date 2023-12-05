package main

import (
	"aoc2023/helpers"
	_ "embed"
	"fmt"
	"github.com/samber/lo"
	"strconv"
	"strings"
)

//go:embed input.txt
var input string

type card struct {
	winners, results []int
}

func main() {
	cards := make([]card, 0)

	for _, row := range strings.Split(input, "\n") {
		cards = append(cards, parseCard(row))
	}

	sumPoints := lo.Reduce(cards, func(agg int, c card, _ int) int {
		return agg + c.PointValue()
	}, 0)

	cascading := make([]int, len(cards))
	for i := range cards {
		cascading[i] = 1
	}

	totalCardCount := 0
	for id, count := range cascading {
		matches := cards[id].Matches()
		goUntil := id + matches

		for next := id + 1; next <= goUntil; next++ {
			cascading[next] += count
		}

		totalCardCount += count
	}

	helpers.Solution(
		fmt.Sprintf("sum of scratch card points: %d", sumPoints),
		fmt.Sprintf("number of all scratch cards: %d", totalCardCount),
	)
}

func parseCard(row string) card {
	parts := strings.Split(row, "|")

	mapper := func(numStr string, _ int) (int, bool) {
		num, err := strconv.Atoi(numStr)
		if err == nil && numStr != "" {
			return num, true
		}

		return -1, false
	}

	winnerParts := strings.Split(parts[0], ": ")

	return card{
		winners: lo.FilterMap(strings.Split(winnerParts[1], " "), mapper),
		results: lo.FilterMap(strings.Split(parts[1], " "), mapper),
	}
}

func (c card) Matches() int {
	return lo.Reduce(c.results, func(agg, result, _ int) int {
		for _, winner := range c.winners {
			if result == winner {
				agg += 1
			}
		}

		return agg
	}, 0)
}

func (c card) PointValue() int {
	matches := c.Matches()
	points := 0
	if matches > 0 {
		for n := 1; n <= matches; n++ {
			points = max(points*2, 1)
		}
	}

	return points
}
