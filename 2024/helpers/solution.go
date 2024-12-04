package helpers

import "fmt"

func Solution(parts ...string) {
	if len(parts) >= 1 {
		fmt.Println("solution part 1)")
		fmt.Println(parts[0])
	}

	if len(parts) >= 2 {
		fmt.Println("----------------------------------------------------------------------")
		fmt.Println("solution part 2)")
		fmt.Println(parts[1])
	}
}
