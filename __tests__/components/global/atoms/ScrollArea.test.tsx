import React from "react"

import { Text } from "react-native"

import { render } from "@testing-library/react-native"

import { ScrollArea } from "@/components/global/atoms"

describe("ScrollArea Component", () => {
  it("renders correctly with children", () => {
    const { getByText } = render(
      <ScrollArea>
        <Text>Test Child</Text>
      </ScrollArea>
    )

    // Ensure the child content is rendered
    expect(getByText("Test Child")).toBeTruthy()
  })

  it("applies custom className correctly", () => {
    const { getByTestId } = render(
      <ScrollArea className="custom-class" testID="scroll-area">
        <Text>Test Child</Text>
      </ScrollArea>
    )

    // Ensure the custom className is applied
    const scrollView = getByTestId("scroll-area")
    expect(scrollView.props.className).toContain("custom-class")
  })

  it("disables scroll indicators", () => {
    const { getByTestId } = render(
      <ScrollArea testID="scroll-area">
        <Text>Test Child</Text>
      </ScrollArea>
    )

    // Check that scroll indicators are disabled
    const scrollView = getByTestId("scroll-area")
    expect(scrollView.props.showsVerticalScrollIndicator).toBe(false)
    expect(scrollView.props.showsHorizontalScrollIndicator).toBe(false)
  })
})
