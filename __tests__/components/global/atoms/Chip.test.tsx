import React from "react"

import { View } from "react-native"

import { fireEvent, render } from "@testing-library/react-native"

import { Chip } from "@/components/global/atoms"

describe("Chip Component", () => {
  it("renders correctly with default props", () => {
    const { getByText } = render(<Chip label="Test Chip" />)

    // Check if the label is rendered
    expect(getByText("Test Chip")).toBeTruthy()
  })

  it("applies default styles when no variant or selected is provided", () => {
    const { getByText } = render(<Chip label="Default Chip" />)

    // Check if the default styles are applied
    const textElement = getByText("Default Chip")
    expect(textElement.props.className).toContain("text-primary")
  })

  it("applies selected styles when selected is true", () => {
    const { getByText } = render(<Chip label="Selected Chip" selected />)

    // Check if the selected styles are applied
    const textElement = getByText("Selected Chip")
    expect(textElement.props.className).toContain("text-white")
  })

  it("calls onPress when pressed", () => {
    const onPressMock = jest.fn()
    const { getByText } = render(
      <Chip label="Pressable Chip" onPress={onPressMock} />
    )

    // Simulate press
    fireEvent.press(getByText("Pressable Chip"))

    // Verify the press handler was called
    expect(onPressMock).toHaveBeenCalledTimes(1)
  })

  it("renders an icon when provided", () => {
    const MockIcon = <View testID="mock-icon" />
    const { getByTestId } = render(<Chip label="Icon Chip" icon={MockIcon} />)

    // Check if the icon is rendered
    expect(getByTestId("mock-icon")).toBeTruthy()
  })

  it("applies custom className when provided", () => {
    const { getByText } = render(
      <Chip label="Custom Chip" className="custom-class" />
    )

    // Check if the custom className is applied
    const textElement = getByText("Custom Chip")
    expect(textElement.props.className).toContain("custom-class")
  })
})
