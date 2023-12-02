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

type game struct {
	id   int
	sets []set
}

type set struct {
	red, green, blue int
}

func main() {
	allGames := lo.Map(strings.Split(input, "\n"), func(result string, _ int) game {
		return parseGame(result)
	})

	sumOfValidGames := lo.Reduce(allGames, func(agg int, g game, _ int) int {
		for _, s := range g.sets {
			if s.red > 12 || s.green > 13 || s.blue > 14 {
				return agg
			}
		}

		return agg + g.id
	}, 0)

	fmt.Println("solution part 1)")
	fmt.Printf("sum of the IDs of all valid games: %d\n", sumOfValidGames)
}

func parseGame(result string) game {
	parts := strings.Split(result, ": ")

	return game{
		id: parseID(parts[0]),
		sets: lo.Map(strings.Split(parts[1], "; "), func(s string, _ int) set {
			return parseSet(s)
		}),
	}
}

func parseID(idPart string) int {
	parts := strings.Split(idPart, " ")
	id, _ := strconv.Atoi(parts[1])

	return id
}

func parseSet(setPart string) set {
	s := set{}

	for _, colorCube := range strings.Split(setPart, ", ") {
		colorParts := strings.Split(colorCube, " ")
		count, _ := strconv.Atoi(colorParts[0])

		switch colorParts[1] {
		case "red":
			s.red += count
			break
		case "green":
			s.green += count
			break
		case "blue":
			s.blue += count
			break
		}
	}

	return s
}
