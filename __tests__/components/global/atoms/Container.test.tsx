import React from "react"

import { Text } from "react-native"

import { render } from "@testing-library/react-native"

import { Container } from "@/components/global/atoms/Container"

describe("Container Component", () => {
  it("should render children correctly", () => {
    const { getByText } = render(
      <Container>
        <Text>Test Content</Text>
      </Container>
    )

    expect(getByText("Test Content")).toBeTruthy()
  })

  it("should apply custom className", () => {
    const { getByTestId } = render(
      <Container testID="test-container">
        <Text>Class Test</Text>
      </Container>
    )

    const container = getByTestId("test-container")
    expect(container.props.className).toContain("custom-class")
  })
})
