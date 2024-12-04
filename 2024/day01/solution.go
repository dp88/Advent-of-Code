package main

import (
	"aoc2024/helpers"
	_ "embed"
	"fmt"
	"slices"
	"strconv"
	"strings"

	"github.com/samber/lo"
)

//go:embed input.txt
var input string

func main() {
	lines := strings.Split(input, "\n")

	cols := [2][]int{}
	cols[0] = make([]int, 0, len(lines))
	cols[1] = make([]int, 0, len(lines))

	for _, line := range lines {
		parts := strings.Split(line, "   ")

		for i := range 2 {
			num, _ := strconv.Atoi(parts[i])
			cols[i] = append(cols[i], num)
		}
	}

	slices.Sort(cols[0])
	slices.Sort(cols[1])

	helpers.Solution(
		fmt.Sprintf("total distance: %d", calculateDiffs(cols)),
		fmt.Sprintf("similarity: %d", calculateSimilarity(cols)),
	)
}

func calculateDiffs(cols [2][]int) int {
	diffs := lo.Map(cols[0], func(val, i int) int {
		return val - cols[1][i]
	})

	return lo.Reduce(diffs, func(acc, val, _ int) int {
		if val < 0 { // Make sure the value is positive
			val = -val
		}

		return acc + val
	}, 0)
}

func calculateSimilarity(cols [2][]int) int {
	return lo.Reduce(cols[0], func(acc, val, _ int) int { // Take everyhing from the first column
		return acc + (val * lo.Count(cols[1], val)) // Multiply it by the count of the same value in the second column
	}, 0)
}
