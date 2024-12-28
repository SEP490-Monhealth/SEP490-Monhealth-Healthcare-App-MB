import React from "react"

import { Text } from "react-native"

import { render } from "@testing-library/react-native"

import { Content } from "@/components/global/atoms/Content"

describe("Content Component", () => {
  it("should render children correctly", () => {
    const { getByText } = render(
      <Content>
        <Text>Test Content</Text>
      </Content>
    )

    expect(getByText("Test Content")).toBeTruthy()
  })

  it("should apply default marginBottom of 124", () => {
    const { getByTestId } = render(
      <Content testID="test-content">
        <Text>Margin Test</Text>
      </Content>
    )

    const content = getByTestId("test-content")
    expect(content.props.style).toMatchObject({ marginBottom: 124 })
  })

  it("should apply marginBottom of 64 when margin is false", () => {
    const { getByTestId } = render(
      <Content marginBottom={false} testID="test-content">
        <Text>No Margin Test</Text>
      </Content>
    )

    const content = getByTestId("test-content")
    expect(content.props.style).toMatchObject({ marginBottom: 64 })
  })

  it("should apply custom className", () => {
    const { getByTestId } = render(
      <Content className="custom-class" testID="test-content">
        <Text>Class Test</Text>
      </Content>
    )

    const content = getByTestId("test-content")
    expect(content.props.className).toContain("custom-class")
  })
})
