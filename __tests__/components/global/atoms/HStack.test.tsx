import React from "react"

import { Text } from "react-native"

import { fireEvent, render } from "@testing-library/react-native"

import { HStack } from "@/components/global/atoms/Stack"

describe("HStack Component", () => {
  it("should render children correctly", () => {
    const { getByText } = render(
      <HStack>
        <Text>Test Content</Text>
      </HStack>
    )

    expect(getByText("Test Content")).toBeTruthy()
  })

  it("should apply gap style correctly", () => {
    const { getByTestId } = render(
      <HStack gap={8} testID="test-hstack">
        <Text>Gap Test</Text>
      </HStack>
    )

    const hstack = getByTestId("test-hstack")
    expect(hstack.props.style).toMatchObject({ gap: 8 })
  })

  it("should handle press events", () => {
    const mockOnPress = jest.fn()

    const { getByTestId } = render(
      <HStack onPress={mockOnPress} testID="test-hstack">
        <Text>Press Test</Text>
      </HStack>
    )

    const hstack = getByTestId("test-hstack")
    fireEvent.press(hstack)

    expect(mockOnPress).toHaveBeenCalledTimes(1)
  })

  it("should apply custom className", () => {
    const { getByTestId } = render(
      <HStack className="custom-class" testID="test-hstack">
        <Text>Class Test</Text>
      </HStack>
    )

    const hstack = getByTestId("test-hstack")
    expect(hstack.props.className).toContain("custom-class")
  })
})
