import React from "react"

import { useRouter } from "expo-router"

import { fireEvent, render, screen } from "@testing-library/react-native"

import { MealCard } from "@/components/global/molecules"

import { getMealTypeImage, getMealTypeName } from "@/utils/helpers"

// Mock the router
jest.mock("expo-router", () => ({
  useRouter: jest.fn()
}))

// Mock helper functions
jest.mock("@/utils/helpers", () => ({
  getMealTypeImage: jest.fn(),
  getMealTypeName: jest.fn()
}))

describe("MealCard Component", () => {
  const mockedRouter = {
    push: jest.fn()
  }

  beforeEach(() => {
    jest.clearAllMocks()
    ;(useRouter as jest.Mock).mockReturnValue(mockedRouter)
  })

  it("renders correctly with default props", () => {
    ;(getMealTypeImage as jest.Mock).mockReturnValue("test-image.png")
    ;(getMealTypeName as jest.Mock).mockReturnValue("Breakfast")

    render(<MealCard mealType="Breakfast" totalCalories={300} />)

    expect(screen.getByText("Breakfast")).toBeTruthy()
    expect(screen.getByText("300 kcal")).toBeTruthy()
    expect(screen.getByTestId("test-meal-image")).toBeTruthy()
  })

  it("renders the correct image based on mealType", () => {
    ;(getMealTypeImage as jest.Mock).mockReturnValue("test-image.png")

    render(<MealCard mealType="Lunch" totalCalories={500} />)

    expect(getMealTypeImage).toHaveBeenCalledWith("Lunch")
    expect(screen.getByTestId("test-meal-image").props.source).toEqual(
      "test-image.png"
    )
  })

  it("renders the progress bar when progress is provided", () => {
    render(<MealCard mealType="Dinner" totalCalories={600} progress={0.5} />)

    expect(screen.getByTestId("progress-bar")).toBeTruthy()
  })

  it("does not render progress bar when progress is not provided", () => {
    render(<MealCard mealType="Snack" totalCalories={150} />)

    expect(screen.queryByTestId("progress-bar")).toBeNull()
  })

  it("navigates to meal details on press", () => {
    render(<MealCard mealType="Breakfast" totalCalories={300} />)

    const card = screen.getByTestId("test-meal-image")
    fireEvent.press(card)

    expect(mockedRouter.push).toHaveBeenCalledWith("/meals/c43ad7ca/details")
  })
})

it("uses default mealType when not provided", () => {
  ;(getMealTypeImage as jest.Mock).mockReturnValue("default-image.png")
  ;(getMealTypeName as jest.Mock).mockReturnValue("Breakfast")

  render(<MealCard totalCalories={300} />)

  expect(getMealTypeName).toHaveBeenCalledWith("Breakfast")
  expect(screen.getByText("Breakfast")).toBeTruthy()
  expect(screen.getByTestId("test-meal-image").props.source).toEqual(
    "default-image.png"
  )
})
