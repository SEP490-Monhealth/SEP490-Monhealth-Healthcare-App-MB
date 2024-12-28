import React from "react"

import { fireEvent, render, screen } from "@testing-library/react-native"

import { WaterCard } from "@/components/global/molecules"

describe("WaterCard Component", () => {
  it("renders time and amount correctly", () => {
    render(<WaterCard time="10:00 AM" amount={250} />)

    expect(screen.getByText("10:00 AM")).toBeTruthy() // Verify time is displayed
    expect(screen.getByText("250 ml")).toBeTruthy() // Verify amount is displayed
  })

  it("defaults amount to 0 when not provided", () => {
    render(<WaterCard time="10:00 AM" />)

    expect(screen.getByText("10:00 AM")).toBeTruthy()
    expect(screen.getByText("0 ml")).toBeTruthy() // Verify default amount
  })

  it("calls onMorePress when the more button is pressed", () => {
    const mockOnMorePress = jest.fn()

    render(
      <WaterCard time="10:00 AM" amount={250} onMorePress={mockOnMorePress} />
    )

    const moreButton = screen.getByRole("button") // IconButton is a button
    fireEvent.press(moreButton)

    expect(mockOnMorePress).toHaveBeenCalled()
  })
})
