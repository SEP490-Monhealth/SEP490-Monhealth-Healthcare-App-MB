import React from "react"

import { fireEvent, render, screen } from "@testing-library/react-native"

import { Checkbox } from "@/components/global/atoms"

describe("Checkbox Component", () => {
  it("renders with default size and styles", () => {
    render(<Checkbox />)

    const checkbox = screen.getByRole("button")
    expect(checkbox).toBeTruthy()
    expect(checkbox.props.style).toMatchObject({ height: 24, width: 24 }) // Default size
  })

  it("applies custom size", () => {
    render(<Checkbox size={40} />)

    const checkbox = screen.getByRole("button")
    expect(checkbox.props.style).toMatchObject({ height: 40, width: 40 })
  })

  it("renders the inner circle when checked", () => {
    render(<Checkbox checked={true} />)

    const innerCircle = screen.getByTestId("checkbox-inner-circle")
    expect(innerCircle).toBeTruthy()
    expect(innerCircle.props.style).toMatchObject({ height: 12, width: 12 }) // Half of default size (24/2)
  })

  it("does not render the inner circle when not checked", () => {
    render(<Checkbox checked={false} />)

    const innerCircle = screen.queryByTestId("checkbox-inner-circle")
    expect(innerCircle).toBeNull()
  })

  it("calls `onCheckChange` with correct value when pressed", () => {
    const onCheckChangeMock = jest.fn()
    render(<Checkbox checked={false} onCheckChange={onCheckChangeMock} />)

    const checkbox = screen.getByRole("button")
    fireEvent.press(checkbox)

    expect(onCheckChangeMock).toHaveBeenCalledTimes(1)
    expect(onCheckChangeMock).toHaveBeenCalledWith(true) // Should toggle to true
  })

  it("applies custom colors when provided", () => {
    render(
      <Checkbox
        borderColor="border-red"
        backgroundColor="bg-gray"
        activeBackgroundColor="bg-green"
        innerCircleColor="bg-yellow"
        checked={true}
      />
    )

    const checkbox = screen.getByRole("button")
    expect(checkbox.props.className).toContain("border-red")
    expect(checkbox.props.className).toContain("bg-green")

    const innerCircle = screen.getByTestId("checkbox-inner-circle")
    expect(innerCircle.props.className).toContain("bg-yellow")
  })
})
