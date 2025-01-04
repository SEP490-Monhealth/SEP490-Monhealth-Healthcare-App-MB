import React from "react"

import { Keyboard, Text, View } from "react-native"

import { fireEvent, render, screen } from "@testing-library/react-native"

import { Container } from "@/components/global/atoms"

jest.spyOn(Keyboard, "dismiss")

describe("Container Component", () => {
  it("renders children correctly", () => {
    render(
      <Container>
        <View testID="child-view">
          <Text>Test Content</Text>
        </View>
      </Container>
    )

    const childView = screen.getByTestId("child-view")
    const text = screen.getByText("Test Content")

    expect(childView).toBeTruthy()
    expect(text).toBeTruthy()
  })

  it("wraps children with SafeAreaView and View when dismissKeyboard is false", () => {
    render(
      <Container dismissKeyboard={false}>
        <Text>Safe Content</Text>
      </Container>
    )

    const safeAreaView = screen.getByTestId("SafeAreaView")
    const contentView = screen.getByTestId("View")

    expect(safeAreaView).toBeTruthy()
    expect(contentView).toBeTruthy()
    expect(screen.getByText("Safe Content")).toBeTruthy()
  })

  it("dismisses keyboard when TouchableWithoutFeedback is pressed", () => {
    render(
      <Container dismissKeyboard={true}>
        <Text>Dismiss Content</Text>
      </Container>
    )

    const touchable = screen.getByTestId("TouchableWithoutFeedback")
    fireEvent.press(touchable)

    expect(Keyboard.dismiss).toHaveBeenCalledTimes(1)
  })

  it("renders TouchableWithoutFeedback when dismissKeyboard is true", () => {
    render(
      <Container dismissKeyboard={true}>
        <Text>Keyboard Dismiss Test</Text>
      </Container>
    )

    const touchable = screen.getByTestId("TouchableWithoutFeedback")
    const safeAreaView = screen.getByTestId("SafeAreaView")

    expect(touchable).toBeTruthy()
    expect(safeAreaView).toBeTruthy()
    expect(screen.getByText("Keyboard Dismiss Test")).toBeTruthy()
  })
})
