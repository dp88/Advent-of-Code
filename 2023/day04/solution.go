package main

import (
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

	for _, card := range cards {
		fmt.Println(card.PointValue())
	}

	sumPoints := lo.Reduce(cards, func(agg int, c card, _ int) int {
		return agg + c.PointValue()
	}, 0)

	fmt.Println("solution part 1)")
	fmt.Printf("sum of scratch card points: %d\n", sumPoints)
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

func (c card) PointValue() int {
	matches := lo.Filter(c.results, func(result int, index int) bool {
		for _, winner := range c.winners {
			if result == winner {
				return true
			}
		}

		return false
	})

	points := 0
	if len(matches) > 0 {
		for n := 1; n <= len(matches); n++ {
			points = max(points*2, 1)
		}
	}

	return points
}
