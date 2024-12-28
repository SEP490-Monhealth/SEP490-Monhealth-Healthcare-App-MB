import React from "react"

import { useRouter } from "expo-router"

import { fireEvent, render, screen } from "@testing-library/react-native"

import { FoodCard } from "@/components/global/molecules"

// Mock the router
jest.mock("expo-router", () => ({
  useRouter: jest.fn()
}))

describe("FoodCard Component", () => {
  const mockedRouter = {
    push: jest.fn()
  }

  beforeEach(() => {
    jest.clearAllMocks()
    ;(useRouter as jest.Mock).mockReturnValue(mockedRouter)
  })

  it("renders correctly for default variant", () => {
    render(
      <FoodCard
        variant="default"
        foodId="123"
        name="Pizza"
        calories={300}
        size="Medium"
        weight={200}
        unit="g"
      />
    )

    expect(screen.getByText("Pizza")).toBeTruthy()
    expect(screen.getByText("300 kcal • Medium • 200 g")).toBeTruthy()
  })

  it("renders correctly for add variant", () => {
    render(<FoodCard variant="add" foodId="123" name="Burger" />)

    expect(screen.getByText("Burger")).toBeTruthy()
    expect(screen.getByText("0 kcal • 1 phần • 0 g")).toBeTruthy()
    expect(screen.getByTestId("test-icon-add-button")).toBeTruthy()
  })

  it("renders correctly for more variant", () => {
    const mockMorePress = jest.fn()

    render(
      <FoodCard
        variant="more"
        foodId="123"
        name="Salad"
        onMorePress={mockMorePress}
      />
    )

    expect(screen.getByText("Salad")).toBeTruthy()
    expect(screen.getByText("0 kcal • 1 phần • 0 g")).toBeTruthy()
    expect(screen.getByTestId("icon-button-more")).toBeTruthy()
  })

  it("navigates to food details when default variant is pressed", () => {
    render(<FoodCard variant="default" foodId="123" name="Pizza" />)

    const card = screen.getByText("Pizza")
    fireEvent.press(card)

    expect(mockedRouter.push).toHaveBeenCalledWith("/foods/123/details")
  })

  it("logs correct message when add button is pressed", () => {
    console.log = jest.fn()

    render(<FoodCard variant="add" foodId="123" name="Burger" />)

    const addButton = screen.getByTestId("test-icon-add-button")
    fireEvent.press(addButton)

    expect(console.log).toHaveBeenCalledWith("Add food", "123")
  })

  it("calls onMorePress handler when more button is pressed", () => {
    const mockMorePress = jest.fn()

    render(
      <FoodCard
        variant="more"
        foodId="123"
        name="Salad"
        onMorePress={mockMorePress}
      />
    )

    const moreButton = screen.getByTestId("icon-button-more")
    fireEvent.press(moreButton)

    expect(mockMorePress).toHaveBeenCalled()
  })
  it("uses default variant when no variant is provided", () => {
    render(<FoodCard foodId="123" name="Pizza" />)

    const card = screen.getByText("Pizza")
    fireEvent.press(card)

    // Check that the router navigates to the correct path
    expect(mockedRouter.push).toHaveBeenCalledWith("/foods/123/details")
  })
})
