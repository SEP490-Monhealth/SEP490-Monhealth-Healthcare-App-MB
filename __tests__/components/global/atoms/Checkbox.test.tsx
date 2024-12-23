import React from "react"

import { fireEvent, render } from "@testing-library/react-native"

import { Checkbox } from "@/components/global/atoms"

describe("Checkbox Component", () => {
  it("renders correctly with default props", () => {
    const { getByRole } = render(<Checkbox />)

    // Ensure the checkbox container is rendered
    const checkbox = getByRole("button")
    expect(checkbox).toBeTruthy()
  })

  it("renders correctly when checked", () => {
    const { getByTestId } = render(<Checkbox checked={true} />)

    // Check if the inner circle is rendered
    const innerCircle = getByTestId("checkbox-inner-circle")
    expect(innerCircle).toBeTruthy()
  })

  it("renders correctly when unchecked", () => {
    const { queryByTestId } = render(<Checkbox checked={false} />)

    // Ensure the inner circle is not rendered
    const innerCircle = queryByTestId("checkbox-inner-circle")
    expect(innerCircle).toBeNull()
  })

  it("calls onCheckChange with the correct value when pressed", () => {
    const onCheckChangeMock = jest.fn()

    // Render with checked = false initially
    const { getByRole } = render(
      <Checkbox checked={false} onCheckChange={onCheckChangeMock} />
    )

    // Simulate press event
    const checkbox = getByRole("button")
    fireEvent.press(checkbox)

    // Verify that onCheckChange is called with `true` (toggling the checked state)
    expect(onCheckChangeMock).toHaveBeenCalledTimes(1)
    expect(onCheckChangeMock).toHaveBeenCalledWith(true)
  })

  it("does not throw an error when onCheckChange is undefined", () => {
    const { getByRole } = render(<Checkbox checked={false} />)

    // Simulate press event
    const checkbox = getByRole("button")
    fireEvent.press(checkbox)

    // Ensure nothing breaks
    expect(checkbox).toBeTruthy() // Component still works without errors
  })

  it("toggles the checked state correctly when pressed (from checked to unchecked)", () => {
    const onCheckChangeMock = jest.fn()

    // Render with checked = true initially
    const { getByRole } = render(
      <Checkbox checked={true} onCheckChange={onCheckChangeMock} />
    )

    // Simulate press event
    const checkbox = getByRole("button")
    fireEvent.press(checkbox)

    // Verify that onCheckChange is called with `false` (toggling the checked state)
    expect(onCheckChangeMock).toHaveBeenCalledTimes(1)
    expect(onCheckChangeMock).toHaveBeenCalledWith(false)
  })

  it("applies custom size and colors", () => {
    const customSize = 32
    const customBorderColor = "border-red-500"
    const customBackgroundColor = "bg-gray-200"
    const customActiveBackgroundColor = "bg-green-500"
    const customInnerCircleColor = "bg-yellow-500"

    const { getByRole } = render(
      <Checkbox
        size={customSize}
        borderColor={customBorderColor}
        backgroundColor={customBackgroundColor}
        activeBackgroundColor={customActiveBackgroundColor}
        innerCircleColor={customInnerCircleColor}
        checked={true}
      />
    )

    // Check the outer container styles
    const checkbox = getByRole("button")
    expect(checkbox.props.style).toMatchObject({
      height: customSize,
      width: customSize
    })
    expect(checkbox.props.className).toContain(customBorderColor)
    expect(checkbox.props.className).toContain(customActiveBackgroundColor)

    // Check the inner circle styles
    const innerCircle = checkbox.findByProps({
      className: "rounded-full bg-yellow-500"
    })
    expect(innerCircle).toBeTruthy()
    expect(innerCircle.props.style).toMatchObject({
      height: customSize / 2,
      width: customSize / 2
    })
  })
})
