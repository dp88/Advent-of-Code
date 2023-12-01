package main

import (
	_ "embed"
	"fmt"
	"strconv"
	"strings"
	"unicode"
)

//go:embed input.txt
var input string

func main() {
	lines := strings.Split(input, "\n")
	sum := 0

	for _, line := range lines {
		first := -1
		last := -1

		for _, character := range line {
			if unicode.IsDigit(character) {
				if first == -1 {
					first = int(character) - '0'
				}

				last = int(character) - '0'
			}
		}

		combinedNumber, _ := strconv.Atoi(fmt.Sprintf("%d%d", first, last))
		sum += combinedNumber
	}

	fmt.Println("solution part 1)")
	fmt.Printf("sum of calibration values: %d", sum)
}
