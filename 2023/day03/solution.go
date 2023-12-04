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
var lines []string
var parts []partNumber

type partNumber struct {
	row     int
	columns []int
}

func main() {
	lines = strings.Split(input, "\n")
	parts = make([]partNumber, 0)

	for row, line := range lines {
		var currentPart *partNumber = nil

		for col := 0; col < len(line); col++ {
			char := line[col : col+1]

			_, err := strconv.Atoi(char)
			if err == nil {
				if currentPart == nil {
					currentPart = &partNumber{
						row:     row,
						columns: make([]int, 0),
					}
				}

				currentPart.columns = append(currentPart.columns, col)
			} else {
				if currentPart != nil {
					parts = append(parts, *currentPart)
					currentPart = nil
				}
			}
		}

		if currentPart != nil {
			parts = append(parts, *currentPart)
			currentPart = nil
		}
	}

	sumOfParts := lo.Reduce(parts, func(agg int, part partNumber, _ int) int {
		if part.IsPartNumber() {
			fmt.Printf("%d (%d, %d)\n", part.Number(), part.row, part.columns[0])
			return agg + part.Number()
		}

		return agg
	}, 0)

	fmt.Println("solution part 1)")
	fmt.Printf("sum of part IDs: %d\n", sumOfParts)

	fmt.Println("----------------------------------------------------------------------")

	fmt.Println("solution part 2)")
}

func (p partNumber) Number() int {
	numberChars := ""

	for _, col := range p.columns {
		numberChars += lines[p.row][col : col+1]
	}

	number, _ := strconv.Atoi(numberChars)
	return number
}

func (p partNumber) IsPartNumber() bool {
	startY := max(p.row-1, 0)
	stopY := min(p.row+1, len(lines)-1)

	startX := max(p.columns[0]-1, 0)
	stopX := min(p.EndColumn()+1, len(lines[p.row]))

	for y := startY; y <= stopY; y++ {
		for x := startX; x <= stopX; x++ {
			// This coordinate is part of the part number
			if y == p.row && x >= p.columns[0] && x <= p.EndColumn() {
				continue
			}

			if x+1 >= len(lines[y]) {
				continue
			}

			char := lines[y][x : x+1]
			_, err := strconv.Atoi(char)
			if err != nil && char != "." {
				return true
			}
		}
	}

	return false
}

func (p partNumber) EndColumn() int {
	return p.columns[len(p.columns)-1]
}
