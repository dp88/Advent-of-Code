package main

import (
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

	diffs := make([]int, 0, len(lines))

	for i := 0; i < len(cols[0]); i++ {
		diff := cols[0][i] - cols[1][i]
		if diff < 0 {
			diff = -diff
		}

		diffs = append(diffs, diff)
	}

	sum := lo.Reduce(diffs, func(acc, val, _ int) int {
		return acc + val
	}, 0)

	fmt.Println("solution part 1)")
	fmt.Println(sum)
}
