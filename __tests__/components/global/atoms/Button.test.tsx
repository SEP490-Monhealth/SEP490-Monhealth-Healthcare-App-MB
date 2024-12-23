import React from "react"

import { View } from "react-native"

import { fireEvent, render } from "@testing-library/react-native"

import { Button } from "@/components/global/atoms"

describe("Button Component", () => {
  it("renders correctly with default props", () => {
    const { getByText } = render(<Button>Default Button</Button>)

    // Check if the button text is rendered
    expect(getByText("Default Button")).toBeTruthy()
  })

  it("applies primary variant styles by default", () => {
    const { getByText } = render(<Button>Primary Button</Button>)

    // Verify primary styles
    const buttonText = getByText("Primary Button")
    expect(buttonText.props.className).toContain("text-primary-foreground")
  })

  it("renders correctly with secondary and danger variants", () => {
    const { getByText } = render(<Button variant="secondary">Secondary</Button>)
    const { getByText: getByTextDanger } = render(
      <Button variant="danger">Danger</Button>
    )

    // Verify secondary styles
    expect(getByText("Secondary").props.className).toContain("text-primary")

    // Verify danger styles
    expect(getByTextDanger("Danger").props.className).toContain(
      "text-destructive-foreground"
    )
  })

  it("renders correctly with different sizes", () => {
    const { getByText: getByTextSm } = render(
      <Button size="sm">Small Button</Button>
    )
    const { getByText: getByTextLg } = render(
      <Button size="lg">Large Button</Button>
    )

    // Verify small size
    expect(getByTextSm("Small Button").props.className).toContain("text-sm")

    // Verify large size
    expect(getByTextLg("Large Button").props.className).toContain("text-lg")
  })

  it("displays loading indicator when loading is true", () => {
    const { getByText, getByTestId } = render(
      <Button loading>Loading Button</Button>
    )

    // Check if loading indicator is displayed
    expect(getByTestId("ActivityIndicator")).toBeTruthy()

    // Ensure button text is still displayed
    expect(getByText("Loading Button")).toBeTruthy()
  })

  it("is disabled when disabled is true", () => {
    const onPressMock = jest.fn()
    const { getByText } = render(
      <Button disabled onPress={onPressMock}>
        Disabled Button
      </Button>
    )

    // Simulate press
    fireEvent.press(getByText("Disabled Button"))

    // Verify that onPress is not called
    expect(onPressMock).not.toHaveBeenCalled()
  })

  it("renders iconStart and iconEnd correctly", () => {
    const MockIconStart = <View testID="icon-start" />
    const MockIconEnd = <View testID="icon-end" />
    const { getByTestId } = render(
      <Button iconStart={MockIconStart} iconEnd={MockIconEnd}>
        Icon Button
      </Button>
    )

    // Check if icons are rendered
    expect(getByTestId("icon-start")).toBeTruthy()
    expect(getByTestId("icon-end")).toBeTruthy()
  })

  it("calls onPress when pressed", () => {
    const onPressMock = jest.fn()
    const { getByText } = render(
      <Button onPress={onPressMock}>Pressable Button</Button>
    )

    // Simulate button press
    fireEvent.press(getByText("Pressable Button"))

    // Verify onPress handler is called
    expect(onPressMock).toHaveBeenCalledTimes(1)
  })

  it("renders correctly when used as an icon-only button", () => {
    const MockIcon = <View testID="icon-only" />
    const { getByTestId } = render(<Button icon>{MockIcon}</Button>)

    // Verify the button renders the icon correctly
    expect(getByTestId("icon-only")).toBeTruthy()
  })
})
