import React from "react"

import { Text } from "react-native"

import { fireEvent, render } from "@testing-library/react-native"

import { VStack } from "@/components/global/atoms/Stack"

describe("VStack Component", () => {
  it("should render children correctly", () => {
    const { getByText } = render(
      <VStack>
        <Text>Test Content</Text>
      </VStack>
    )

    expect(getByText("Test Content")).toBeTruthy()
  })

  it("should apply gap style correctly", () => {
    const { getByTestId } = render(
      <VStack gap={8} testID="test-vstack">
        <Text>Gap Test</Text>
      </VStack>
    )

    const vstack = getByTestId("test-vstack")
    expect(vstack.props.style).toMatchObject({ gap: 8 })
  })

  it("should handle press events", () => {
    const mockOnPress = jest.fn()

    const { getByTestId } = render(
      <VStack onPress={mockOnPress} testID="test-vstack">
        <Text>Press Test</Text>
      </VStack>
    )

    const vstack = getByTestId("test-vstack")
    fireEvent.press(vstack)

    expect(mockOnPress).toHaveBeenCalledTimes(1)
  })

  it("should apply custom className", () => {
    const { getByTestId } = render(
      <VStack className="custom-class" testID="test-vstack">
        <Text>Class Test</Text>
      </VStack>
    )

    const vstack = getByTestId("test-vstack")
    expect(vstack.props.className).toContain("custom-class")
  })
})
