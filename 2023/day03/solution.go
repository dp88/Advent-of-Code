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
var lines []string

var parts, gears []part

type part struct {
	row              int
	startCol, endCol int
}

func main() {
	lines = strings.Split(input, "\n")
	parts = make([]part, 0, 128)
	gears = make([]part, 0, 128)

	for row, line := range lines {
		var currentPart *part = nil

		for col := 0; col < len(line); col++ {
			char := line[col : col+1]

			_, err := strconv.Atoi(char)
			if err == nil {
				if currentPart == nil {
					currentPart = &part{
						row:      row,
						startCol: col,
					}
				}
			} else {
				if currentPart != nil {
					currentPart.endCol = col - 1
					parts = append(parts, *currentPart)
					currentPart = nil
				}

				if char == "*" {
					gears = append(gears, part{
						row:      row,
						startCol: col,
						endCol:   col,
					})
				}
			}
		}

		if currentPart != nil {
			currentPart.endCol = len(line) - 1
			parts = append(parts, *currentPart)
			currentPart = nil
		}
	}

	sumOfParts := lo.Reduce(parts, func(agg int, part part, _ int) int {
		if part.IsPartNumber() {
			agg += part.Number()
		}

		return agg
	}, 0)

	sumRatios := lo.Reduce(gears, func(agg int, gear part, _ int) int {
		return agg + gear.GearRatio()
	}, 0)

	helpers.Solution(
		fmt.Sprintf("sum of part IDs: %d", sumOfParts),
		fmt.Sprintf("sum of gear ratios: %d", sumRatios),
	)

}

func (p part) Number() int {
	numberChars := ""

	for x := p.startCol; x <= p.endCol; x++ {
		numberChars += lines[p.row][x : x+1]
	}

	number, _ := strconv.Atoi(numberChars)
	return number
}

func (p part) IsPartNumber() bool {
	isPartNumber := false
	p.Encircle(func(x, y int) {
		char := lines[y][x : x+1]
		_, err := strconv.Atoi(char)
		if err != nil && char != "." {
			isPartNumber = true
		}
	})

	return isPartNumber
}

func (p part) GearRatio() int {
	numbers := make([]part, 0, 4)

	p.Encircle(func(x, y int) {
		number, ok := lo.Find(parts, func(other part) bool {
			return other.Contains(x, y)
		})

		if ok {
			numbers = append(numbers, number)
		}
	})

	numbers = lo.Uniq(numbers)

	if len(numbers) == 2 {
		return numbers[0].Number() * numbers[1].Number()
	}

	return 0
}

func (p part) Contains(x, y int) bool {
	return y == p.row && x >= p.startCol && x <= p.endCol
}

func (p part) Encircle(callback func(x, y int)) {
	startY := max(p.row-1, 0)
	stopY := min(p.row+1, len(lines)-1)

	startX := max(p.startCol-1, 0)
	stopX := min(p.endCol+1, len(lines[p.row]))

	for y := startY; y <= stopY; y++ {
		for x := startX; x <= stopX; x++ {
			if p.Contains(x, y) || x+1 >= len(lines[y]) {
				continue
			}

			callback(x, y)
		}
	}
}
