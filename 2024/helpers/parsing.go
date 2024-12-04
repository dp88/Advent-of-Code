package helpers

import (
	"github.com/samber/lo"
	"strconv"
	"strings"
)

func LineToNums(numberLine string) []int {
	return lo.Map(
		strings.Split(numberLine, " "),
		func(num string, _ int) int {
			parsed, _ := strconv.Atoi(num)
			return parsed
		})
}
