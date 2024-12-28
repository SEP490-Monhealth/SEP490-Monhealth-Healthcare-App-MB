import React from "react"

import { useRouter } from "expo-router"

import { fireEvent, render } from "@testing-library/react-native"

import { FoodCard } from "@/components/global/molecules"

jest.mock("expo-router", () => ({
  useRouter: jest.fn()
}))

describe("FoodCard", () => {
  const mockPush = jest.fn()

  beforeEach(() => {
    ;(useRouter as jest.Mock).mockReturnValue({
      push: mockPush
    })
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it("renders default variant correctly", () => {
    const { getByText } = render(
      <FoodCard
        variant="default"
        foodId="1"
        name="Apple"
        calories={95}
        size="Medium"
        weight={182}
        unit="g"
      />
    )

    // Kiểm tra nội dung hiển thị đúng
    expect(getByText("Apple")).toBeTruthy()
    expect(getByText("95 kcal • Medium • 182 g")).toBeTruthy()

    // Kiểm tra hành động nhấn vào thẻ
    fireEvent.press(getByText("Apple"))
    expect(mockPush).toHaveBeenCalledWith("/foods/1/details")
  })

  it("navigates to food details when card is pressed", () => {
    const { getByText } = render(
      <FoodCard
        variant="default"
        foodId="1"
        name="Apple"
        calories={95}
        size="Medium"
        weight={182}
        unit="g"
      />
    )

    fireEvent.press(getByText("Apple"))
    expect(mockPush).toHaveBeenCalledWith("/foods/1/details")
  })

  it("renders add button and triggers callback when pressed", () => {
    const consoleSpy = jest.spyOn(console, "log").mockImplementation(() => {})

    const { getByTestId } = render(
      <FoodCard
        variant="add"
        foodId="2"
        name="Banana"
        calories={105}
        weight={118}
        unit="g"
      />
    )

    const addButton = getByTestId("icon-button-add")
    expect(addButton).toBeTruthy()

    fireEvent.press(addButton)
    expect(consoleSpy).toHaveBeenCalledWith("Add food", "2")

    consoleSpy.mockRestore()
  })

  it("renders more button and triggers callback when pressed", () => {
    const consoleSpy = jest.spyOn(console, "log").mockImplementation(() => {})

    const { getByTestId } = render(
      <FoodCard
        variant="more"
        foodId="3"
        name="Orange"
        calories={62}
        weight={131}
        unit="g"
      />
    )

    const moreButton = getByTestId("icon-button-more")
    expect(moreButton).toBeTruthy()

    fireEvent.press(moreButton)
    expect(consoleSpy).toHaveBeenCalledWith("More")

    consoleSpy.mockRestore()
  })

  it("renders with default values for missing props", () => {
    const { getByText } = render(
      <FoodCard foodId="4" name="Grapes" variant="default" />
    )

    expect(getByText("Grapes")).toBeTruthy()
    expect(getByText("0 kcal • 1 phần • 0 g")).toBeTruthy()
  })
})
