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

var numbers = [...]string{
	"one",
	"two",
	"three",
	"four",
	"five",
	"six",
	"seven",
	"eight",
	"nine",
}

func main() {
	lines := strings.Split(input, "\n")

	fmt.Println("solution part 1)")
	fmt.Printf("sum of calibration values: %d\n", search(lines, false))

	fmt.Println("----------------------------------------------------------------------")

	fmt.Println("solution part 2)")
	fmt.Printf("sum of calibration values with spelled numbers: %d\n", search(lines, true))
}

func search(lines []string, searchSpelledNumbers bool) int {
	sum := 0

	for _, line := range lines {
		first := -1
		last := -1

		for i := 0; i < len(line); i++ {
			digit := findDigit(i, line, searchSpelledNumbers)
			if digit != -1 {
				if first == -1 {
					first = digit
				}

				last = digit
			}
		}

		combinedNumber, _ := strconv.Atoi(fmt.Sprintf("%d%d", first, last))
		sum += combinedNumber
	}

	return sum
}

func findDigit(index int, line string, searchSpelledNumbers bool) int {
	if unicode.IsDigit(rune(line[index])) {
		return int(line[index]) - '0'
	}

	if searchSpelledNumbers {
		nextFiveIsh := line[index:]
		if len(nextFiveIsh) > 5 {
			nextFiveIsh = nextFiveIsh[:5]
		}

		return checkStringForDigit(nextFiveIsh)
	}

	return -1
}

func checkStringForDigit(text string) int {
	for numberIndex, spelledNumber := range numbers {
		if len(spelledNumber) > len(text) {
			continue
		}

		shortenedText := text[:len(spelledNumber)]

		if strings.Contains(shortenedText, spelledNumber) {
			return numberIndex + 1
		}
	}

	return -1
}
