package main

import (
	"aoc2024/helpers"
	_ "embed"
	"fmt"
	"strconv"
	"strings"

	"github.com/samber/lo"
)

//go:embed input.txt
var input string

func main() {
	lines := strings.Split(input, "\n")
	levels := lo.Map(lines, func(line string, _ int) []int {
		return lo.Map(strings.Split(line, " "), func(num string, _ int) int {
			i, _ := strconv.Atoi(num)
			return i
		})
	})

	helpers.Solution(
		fmt.Sprintf("safe levels: %d", len(safeLevels(levels))),
	)
}

func safeLevels(levels [][]int) [][]int {
	return lo.Filter(levels, func(level []int, _ int) bool {
		hasIncrease := false
		hasDecrease := false

		for i := 1; i < len(level); i++ {
			diff := level[i] - level[i-1] // Calculate the difference between the current and the previous level

			if diff > 0 { // Check if the difference is positive... implies ascending order
				hasIncrease = true
			} else if diff < 0 { // Check if the difference is negative... implies descending order
				hasDecrease = true
			} else { // Steady state... immediate failure
				return false
			}

			// Failure states:
			// 1. Difference is too great
			// 2. Levels are not steadily acending or descending
			if (diff > 3 || diff < -3) || (hasIncrease && hasDecrease) {
				return false
			}
		}

		return true
	})
}
