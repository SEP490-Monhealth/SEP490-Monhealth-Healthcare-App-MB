import React from "react"

import { TouchableOpacity, View } from "react-native"

import { fireEvent, render, screen } from "@testing-library/react-native"

import { Input } from "@/components/global/atoms"

describe("Input Component", () => {
  it("renders the input with default props", () => {
    render(<Input placeholder="Enter text" />)

    const input = screen.getByPlaceholderText("Enter text")
    expect(input).toBeTruthy()
    expect(input.props.editable).toBe(true)
    expect(input.props.keyboardType).toBe("default")
  })

  it("renders the input in disabled state", () => {
    render(<Input placeholder="Disabled input" disabled={true} />)

    const input = screen.getByPlaceholderText("Disabled input")
    expect(input.props.editable).toBe(false)
  })

  it("renders with an error message", () => {
    render(<Input placeholder="Error input" errorMessage="This is an error" />)

    const errorText = screen.getByText("This is an error")
    expect(errorText).toBeTruthy()

    const input = screen.getByPlaceholderText("Error input")
    expect(input.props.className).toContain("text-destructive")
  })

  it("allows clearing text when `canClearText` is true", () => {
    const onChangeTextMock = jest.fn()
    render(
      <Input
        placeholder="Clearable input"
        value="Hello"
        onChangeText={onChangeTextMock}
        canClearText={true}
      />
    )

    const clearButton = screen
      .getByTestId("test-input")
      .findByType(TouchableOpacity)
    expect(clearButton).toBeTruthy()

    fireEvent.press(clearButton)

    expect(onChangeTextMock).toHaveBeenCalledWith("")
  })

  it("handles text input correctly", () => {
    const onChangeTextMock = jest.fn()
    render(
      <Input placeholder="Type something" onChangeText={onChangeTextMock} />
    )

    const input = screen.getByPlaceholderText("Type something")
    fireEvent.changeText(input, "Test input")

    expect(onChangeTextMock).toHaveBeenCalledWith("Test input")
  })

  it("toggles secure text entry when `isSecure` is true", () => {
    const onToggleSecureMock = jest.fn()
    render(
      <Input
        placeholder="Secure input"
        isSecure={true}
        onToggleSecure={onToggleSecureMock}
        endIcon={<View testID="secure-icon" />}
      />
    )

    const secureIcon = screen.getByTestId("secure-icon")
    expect(secureIcon).toBeTruthy()

    fireEvent.press(secureIcon)
    expect(onToggleSecureMock).toHaveBeenCalled()
  })

  it("aligns text to the right when `alignRight` is true", () => {
    render(<Input placeholder="Aligned input" alignRight={true} />)

    const input = screen.getByPlaceholderText("Aligned input")
    expect(input.props.textAlign).toBe("right")
  })

  it("renders with start and end icons", () => {
    render(
      <Input
        placeholder="Icon input"
        startIcon={<View testID="start-icon" />}
        endIcon={<View testID="end-icon" />}
      />
    )

    const startIcon = screen.getByTestId("start-icon")
    const endIcon = screen.getByTestId("end-icon")

    expect(startIcon).toBeTruthy()
    expect(endIcon).toBeTruthy()
  })

  it("handles multiline input", () => {
    render(
      <Input
        placeholder="Multiline input"
        isMultiline={true}
        numberOfLines={3}
      />
    )

    const input = screen.getByPlaceholderText("Multiline input")
    expect(input.props.multiline).toBe(true)
    expect(input.props.numberOfLines).toBe(3)
    expect(input.props.textAlignVertical).toBe("top")
  })

  it("renders the input with custom styles", () => {
    render(<Input placeholder="Styled input" className="custom-class" />)

    const inputContainer = screen.getByTestId("test-input").findByType(View)
    expect(inputContainer.props.className).toContain("custom-class")
  })
})
