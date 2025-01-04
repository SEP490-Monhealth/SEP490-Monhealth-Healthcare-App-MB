import React from "react"

import { fireEvent, render, screen } from "@testing-library/react-native"

import { Select } from "@/components/global/atoms"

describe("Select Component", () => {
  it("renders with default value", () => {
    render(<Select defaultValue="Select an option" onPress={() => {}} />)

    const text = screen.getByText("Select an option")
    expect(text).toBeTruthy()
    expect(text.props.style).toEqual({ color: "#a9a9a9" }) // Default text color
  })

  it("renders with a selected value", () => {
    render(
      <Select
        defaultValue="Select an option"
        value="Option 1"
        onPress={() => {}}
      />
    )

    const text = screen.getByText("Option 1")
    expect(text).toBeTruthy()
    expect(text.props.className).toContain("text-primary")
  })

  it("renders with an error message", () => {
    render(
      <Select
        defaultValue="Select an option"
        errorMessage="This field is required"
        onPress={() => {}}
      />
    )

    const errorText = screen.getByText("This field is required")
    expect(errorText).toBeTruthy()

    const container = screen.getByRole("button")
    expect(container.props.className).toContain("border-destructive")
    expect(container.props.className).toContain("bg-red-50")
  })

  it("calls onPress when touched", () => {
    const onPressMock = jest.fn()
    render(<Select defaultValue="Select an option" onPress={onPressMock} />)

    const button = screen.getByRole("button")
    fireEvent.press(button)

    expect(onPressMock).toHaveBeenCalledTimes(1)
  })

  it("applies custom className", () => {
    render(
      <Select
        defaultValue="Select an option"
        className="custom-class"
        onPress={() => {}}
      />
    )

    const container = screen.getByRole("button")
    expect(container.props.className).toContain("custom-class")
  })
})
