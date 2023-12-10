package main

import (
	"aoc2023/helpers"
	_ "embed"
	"fmt"
	"github.com/samber/lo"
	"strings"
)

//go:embed input.txt
var input string

type seedRange [2]int

type gardenMap struct {
	input, output string
	ranges        []gardenRange
}

type gardenRange struct {
	destination, source, length int
}

var (
	seeds      []int
	seedRanges []seedRange
	maps       map[string]gardenMap
)

func main() {
	lines := strings.Split(input, "\n")
	seeds, seedRanges = parseSeeds(lines[0])
	maps = make(map[string]gardenMap)

	start := 2
	for i := start; i < len(lines); i++ {
		if lines[i] == "" { // found the end of the group
			gm := parseMap(lines[start:i])
			maps[gm.input] = gm

			start = i + 1
		}
	}

	simpleLowest := 9999999999
	for _, seed := range seeds {
		simpleLowest = min(simpleLowest, seedToLocation(seed))
	}

	allLocations := make([]seedRange, 0)
	for _, sr := range seedRanges {
		soils := getDestinations(sr, maps["seed"])

		nextRange := func(sourceRange []seedRange, searchMapName string) []seedRange {
			next := make([]seedRange, 0)
			for _, sourceItem := range sourceRange {
				n := getDestinations(sourceItem, maps[searchMapName])
				next = append(next, n...)
			}

			return next
		}

		fertilizers := nextRange(soils, "soil")
		waters := nextRange(fertilizers, "fertilizer")
		lights := nextRange(waters, "water")
		temperatures := nextRange(lights, "light")
		humidities := nextRange(temperatures, "temperature")
		locations := nextRange(humidities, "humidity")

		allLocations = append(allLocations, locations...)
	}

	rangedLowest := lo.Reduce(allLocations, func(agg int, sr seedRange, _ int) int {
		return min(sr[0], agg)
	}, 9999999999)

	helpers.Solution(
		fmt.Sprintf("closest start location for simple seeds is %d", simpleLowest),
		fmt.Sprintf("closest start location for ranged seeds is %d", rangedLowest),
	)
}

func parseSeeds(line string) ([]int, []seedRange) {
	simpleSeeds := helpers.LineToNums(strings.Split(line, ": ")[1])
	rangedSeeds := make([]seedRange, 0, len(simpleSeeds)/2)

	for i := 0; i < len(simpleSeeds); i += 2 {
		rangedSeeds = append(rangedSeeds, [2]int{simpleSeeds[i], simpleSeeds[i+1]})
	}

	return simpleSeeds, rangedSeeds
}

func parseMap(lines []string) gardenMap {
	justNames := strings.Split(lines[0], " ")
	parts := strings.Split(justNames[0], "-to-")
	gm := gardenMap{
		input:  parts[0],
		output: parts[1],
		ranges: make([]gardenRange, 0, len(lines)-1),
	}

	for _, line := range lines[1:] {
		nums := helpers.LineToNums(line)
		gm.ranges = append(gm.ranges, gardenRange{
			destination: nums[0],
			source:      nums[1],
			length:      nums[2],
		})
	}

	return gm
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

func seedToLocation(location int) int {
	for step := "seed"; step != "location"; {
		location = getDestination(location, maps[step])
		step = maps[step].output
	}

	return location
}

func getDestinations(source seedRange, gm gardenMap) []seedRange {
	destinations := make([]seedRange, 0)

	for _, gr := range gm.ranges {
		overlapPoint := overlaps(source[0], source[1], gr.source, gr.length)
		if overlapPoint > -1 {
			endPoint := min(
				source[0]+source[1], // End point of source range
				gr.source+gr.length, // End point of garden range
			)

			destinations = append(destinations, seedRange{
				overlapPoint,
				endPoint - overlapPoint,
			})
		}
	}

	return destinations
}

func overlaps(aStart, aLength, bStart, bLength int) int {
	aEnd := aStart + aLength
	bEnd := bStart + bLength

	maxStart := max(aStart, bStart)
	minEnd := min(aEnd, bEnd)

	if maxStart < minEnd {
		return maxStart
	}
	return -1
}
