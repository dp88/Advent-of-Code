package main

import (
	"aoc2023/helpers"
	_ "embed"
	"fmt"
	"strings"
)

//go:embed input.txt
var input string

var (
	seeds []int
	maps  map[string]gardenMap
)

type gardenMap struct {
	a, b   string
	ranges []gardenRange
}

type gardenRange struct {
	destination, source, length int
}

func main() {
	lines := strings.Split(input, "\n")
	seeds = parseSeeds(lines[0])
	maps = make(map[string]gardenMap)

	start := 2
	for i := start; i < len(lines); i++ {
		if lines[i] == "" { // found the end of the group
			gm := parseMap(lines[start:i])
			maps[gm.a] = gm

			start = i + 1
		}
	}

	lowest := 9999999999

	for _, seed := range seeds {
		soil := getDestination(seed, maps["seed"])
		fertilizer := getDestination(soil, maps["soil"])
		water := getDestination(fertilizer, maps["fertilizer"])
		light := getDestination(water, maps["water"])
		temperature := getDestination(light, maps["light"])
		humidity := getDestination(temperature, maps["temperature"])
		location := getDestination(humidity, maps["humidity"])

		lowest = min(lowest, location)
	}

	helpers.Solution(
		fmt.Sprintf("closest start location is %d", lowest),
	)
}

func parseSeeds(line string) []int {
	return helpers.LineToNums(strings.Split(line, ": ")[1])
}

func parseMap(lines []string) gardenMap {
	a, b := parseMapName(lines[0])
	gm := gardenMap{
		a:      a,
		b:      b,
		ranges: make([]gardenRange, 0, len(lines)-1),
	}

	for _, line := range lines[1:] {
		gm.ranges = append(gm.ranges, parseGardenRange(line))
	}

	return gm
}

func parseMapName(line string) (string, string) {
	justNames := strings.Split(line, " ")
	parts := strings.Split(justNames[0], "-to-")
	return parts[0], parts[1]
}

func parseGardenRange(line string) gardenRange {
	numbers := helpers.LineToNums(line)

	return gardenRange{
		destination: numbers[0],
		source:      numbers[1],
		length:      numbers[2],
	}
}

func getDestination(source int, gm gardenMap) int {
	for _, gr := range gm.ranges {
		offset := source - gr.source
		if offset >= 0 && offset <= gr.length { // source is covered by this range
			return gr.destination + offset
		}
	}

	return source
}
