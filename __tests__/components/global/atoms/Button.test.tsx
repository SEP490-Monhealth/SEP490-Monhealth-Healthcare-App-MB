import React from "react"

import { View } from "react-native"

import { fireEvent, render, screen } from "@testing-library/react-native"

import { Button } from "@/components/global/atoms"

describe("Button Component", () => {
  it("renders the button with default variant and size", () => {
    render(<Button>Click Me</Button>)

    const button = screen.getByRole("button")
    expect(button).toBeTruthy()
    expect(button.props.className).toContain("bg-primary")
    expect(button.props.className).toContain("h-14 px-5") // Default size is "md"
  })

  it("renders the correct variant and size", () => {
    render(
      <Button variant="danger" size="lg">
        Delete
      </Button>
    )

    const button = screen.getByRole("button")
    expect(button.props.className).toContain("bg-destructive")
    expect(button.props.className).toContain("h-16 px-6") // Size "lg"
  })

  it("renders with loading state", () => {
    render(<Button loading={true}>Loading...</Button>)

    const loader = screen.getByTestId("ActivityIndicator")
    expect(loader).toBeTruthy()

    const text = screen.getByText("Loading...")
    expect(text).toBeTruthy()
  })

  it("renders with iconStart and iconEnd", () => {
    render(
      <Button
        iconStart={<View testID="icon-start" />}
        iconEnd={<View testID="icon-end" />}
      >
        Submit
      </Button>
    )

    const iconStart = screen.getByTestId("icon-start")
    const iconEnd = screen.getByTestId("icon-end")
    const text = screen.getByText("Submit")

    expect(iconStart).toBeTruthy()
    expect(iconEnd).toBeTruthy()
    expect(text).toBeTruthy()
  })

  it("renders with only an icon when `icon` prop is true", () => {
    render(<Button icon={true}>Icon</Button>)

    const button = screen.getByRole("button")
    const text = screen.queryByText("Icon") // Text should not appear
    expect(button).toBeTruthy()
    expect(text).toBeNull()
  })

  it("does not trigger onPress when disabled", () => {
    const onPressMock = jest.fn()
    render(
      <Button disabled={true} onPress={onPressMock}>
        Disabled
      </Button>
    )

    const button = screen.getByRole("button")
    fireEvent.press(button)

    expect(onPressMock).not.toHaveBeenCalled()
  })

  it("triggers onPress when pressed and not disabled or loading", () => {
    const onPressMock = jest.fn()
    render(<Button onPress={onPressMock}>Click Me</Button>)

    const button = screen.getByRole("button")
    fireEvent.press(button)

    expect(onPressMock).toHaveBeenCalledTimes(1)
  })

  it("applies custom className", () => {
    render(<Button className="custom-class">Custom Button</Button>)

    const button = screen.getByRole("button")
    expect(button.props.className).toContain("custom-class")
  })
})
