import React from "react"

import { Text } from "react-native"

import { fireEvent, render } from "@testing-library/react-native"

import { Card } from "@/components/global/atoms/Card"

describe("Card Component", () => {
  it("should render children correctly", () => {
    const { getByText } = render(
      <Card>
        <Text>Test Content</Text>
      </Card>
    )

    expect(getByText("Test Content")).toBeTruthy()
  })

  it("should handle press events", () => {
    const mockOnPress = jest.fn()

    const { getByTestId } = render(
      <Card onPress={mockOnPress} testID="test-card">
        <Text>Press Test</Text>
      </Card>
    )

    const card = getByTestId("test-card")
    fireEvent.press(card)

    expect(mockOnPress).toHaveBeenCalledTimes(1)
  })

  it("should apply custom className", () => {
    const { getByTestId } = render(
      <Card className="custom-class" testID="test-card">
        <Text>Class Test</Text>
      </Card>
    )

    const card = getByTestId("test-card")
    expect(card.props.className).toContain("custom-class")
  })

  it("should set activeOpacity to default value", () => {
    const { getByTestId } = render(
      <Card testID="test-card">
        <Text>Opacity Test</Text>
      </Card>
    )

    const card = getByTestId("test-card")
    expect(card.props.activeOpacity).toBe(0.7)
  })

  it("should set custom activeOpacity when provided", () => {
    const { getByTestId } = render(
      <Card activeOpacity={0.9} testID="test-card">
        <Text>Custom Opacity Test</Text>
      </Card>
    )

    const card = getByTestId("test-card")
    expect(card.props.activeOpacity).toBe(0.9)
  })
})
