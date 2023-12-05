package main

import (
	"aoc2023/helpers"
	_ "embed"
	"fmt"
	"strings"
)

//go:embed input.txt
var input string

var digits = [9]string{
	"1", "2", "3", "4", "5", "6", "7", "8", "9",
}

var spelled = [9]string{
	"one", "two", "three", "four", "five", "six", "seven", "eight", "nine",
}

func main() {
	lines := strings.Split(input, "\n")

	helpers.Solution(
		fmt.Sprintf("sum of calibration values: %d", search(lines, digits)),
		fmt.Sprintf("sum of calibration values with spelled spelled: %d", search(lines, digits, spelled)),
	)
}

func search(lines []string, matches ...[9]string) int {
	sum := 0

	for _, line := range lines {
		first := -1
		last := -1

		for i := 0; i < len(line); i++ {
			digit := findDigit(line[i:], matches...)
			if digit != -1 {
				if first == -1 {
					first = digit
				}

				last = digit
			}
		}

		sum += (first * 10) + last
	}

	return sum
}

func findDigit(haystack string, matches ...[9]string) int {
	for _, field := range matches {
		for numberIndex, numberRepresentation := range field {
			if len(numberRepresentation) > len(haystack) {
				continue
			}

			shortenedText := haystack[:len(numberRepresentation)]
			if strings.Contains(shortenedText, numberRepresentation) {
				return numberIndex + 1
			}
		}
	}

	return -1
}
