import React from "react"

import { useRouter } from "expo-router"

import { act, fireEvent, render } from "@testing-library/react-native"

import { MealCard } from "@/components/global/molecules"

import { COLORS } from "@/constants/app"

jest.mock("expo-router", () => ({
  useRouter: jest.fn()
}))

jest.useFakeTimers() // Use fake timers for Animated

const mockRouterPush = jest.fn()

;(useRouter as jest.Mock).mockReturnValue({
  push: mockRouterPush
})

describe("MealCard", () => {
  const defaultProps = {
    mealType: "Breakfast" as "Breakfast",
    totalCalories: 300,
    progress: 50
  }

  const getMealImageSource = (
    mealType: "Breakfast" | "Lunch" | "Dinner" | "Snack" | string
  ) => {
    switch (mealType) {
      case "Breakfast":
        return require("../../../../public/icons/sandwich.png")
      case "Lunch":
        return require("../../../../public/icons/rice.png")
      case "Dinner":
        return require("../../../../public/icons/roast-chicken.png")
      case "Snack":
        return require("../../../../public/icons/cupcake.png")
      default:
        return require("../../../../public/icons/dish.png")
    }
  }

  it("renders correctly with default props", async () => {
    const { getByText, getByTestId } = render(<MealCard {...defaultProps} />)

    await act(async () => {
      jest.advanceTimersByTime(500) // Advance timers for Animated updates
    })

    expect(getByText("Bữa sáng")).toBeTruthy()
    expect(getByText("300 kcal")).toBeTruthy()
    expect(getByTestId("meal-image").props.source).toEqual(
      getMealImageSource("Breakfast")
    )
    expect(getByTestId("progress-bar")).toBeTruthy()
  })

  it("handles onPress and navigates to the correct route", async () => {
    const { getByTestId } = render(<MealCard {...defaultProps} />)

    const card = getByTestId("meal-image")
    await act(async () => {
      fireEvent.press(card)
    })

    expect(mockRouterPush).toHaveBeenCalledWith("/meals/c43ad7ca/details")
  })

  it("renders the correct meal image for each meal type", async () => {
    const mealTypes: ("Breakfast" | "Lunch" | "Dinner" | "Snack")[] = [
      "Breakfast",
      "Lunch",
      "Dinner",
      "Snack"
    ]

    for (const mealType of mealTypes) {
      const { getByTestId, unmount } = render(
        <MealCard mealType={mealType} totalCalories={400} />
      )

      await act(async () => {
        jest.advanceTimersByTime(500)
      })

      expect(getByTestId("meal-image").props.source).toEqual(
        getMealImageSource(mealType)
      )

      unmount()
    }
  })

  it("renders fallback image for an unknown meal type", async () => {
    const { getByTestId } = render(
      <MealCard
        mealType={"Unknown" as unknown as "Breakfast"}
        totalCalories={400}
      />
    )

    await act(async () => {
      jest.advanceTimersByTime(500)
    })

    expect(getByTestId("meal-image").props.source).toEqual(
      getMealImageSource("Unknown")
    )
  })
})
