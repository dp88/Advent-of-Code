package main

import (
	_ "embed"
	"fmt"
	"github.com/samber/lo"
	"sort"
	"strconv"
	"strings"
)

//go:embed input.txt
var input string

func main() {
	backpacks := lo.Map(strings.Split(input, "\n\n"), func(rawPack string, _ int) []int {
		return lo.Map(strings.Split(rawPack, "\n"), func(contents string, _ int) int {
			calories, _ := strconv.Atoi(contents)
			return calories
		})
	})

	summed := lo.Map(backpacks, func(pack []int, _ int) int {
		return lo.Reduce(pack, func(agg int, item int, _ int) int {
			return agg + item
		}, 0)
	})

	sort.Slice(summed, func(i, j int) bool {
		return summed[i] > summed[j]
	})

	fmt.Println("solution part 1)")
	fmt.Printf("highest caloric content: %d\n", summed[0])

	fmt.Println("----------------------------------------------------------------------")

	topThree := lo.Reduce(summed[:3], func(agg int, item int, _ int) int {
		return agg + item
	}, 0)

	fmt.Println("solution part 2)")
	fmt.Printf("top 3 caloric sum: %d\n", topThree)
}
