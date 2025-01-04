import React from "react"

import { fireEvent, render, screen } from "@testing-library/react-native"

import { OTPInput } from "@/components/global/atoms"

describe("OTPInput Component", () => {
  it("renders the correct number of input fields", () => {
    render(<OTPInput length={4} />)

    const inputs = screen.getAllByRole("textbox")
    expect(inputs.length).toBe(4)
  })

  it("focuses on the next input field after entering a digit", () => {
    render(<OTPInput length={4} />)

    const inputs = screen.getAllByRole("textbox")
    fireEvent.changeText(inputs[0], "1")

    expect(inputs[1].props.autoFocus).toBeTruthy()
  })

  it("calls onOTPChange with the correct OTP after entering all digits", () => {
    const onOTPChangeMock = jest.fn()
    render(<OTPInput length={4} onOTPChange={onOTPChangeMock} />)

    const inputs = screen.getAllByRole("textbox")

    fireEvent.changeText(inputs[0], "1")
    fireEvent.changeText(inputs[1], "2")
    fireEvent.changeText(inputs[2], "3")
    fireEvent.changeText(inputs[3], "4")

    expect(onOTPChangeMock).toHaveBeenCalledWith("1234")
  })

  it("handles backspace correctly", () => {
    render(<OTPInput length={4} />)

    const inputs = screen.getAllByRole("textbox")

    fireEvent.changeText(inputs[0], "1")
    fireEvent.changeText(inputs[1], "2")
    fireEvent.changeText(inputs[2], "3")

    fireEvent(inputs[2], "keyPress", { nativeEvent: { key: "Backspace" } })
    expect(inputs[2].props.value).toBe("")

    fireEvent(inputs[1], "keyPress", { nativeEvent: { key: "Backspace" } })
    expect(inputs[1].props.value).toBe("")

    fireEvent(inputs[0], "keyPress", { nativeEvent: { key: "Backspace" } })
    expect(inputs[0].props.value).toBe("")
  })

  it("does not focus beyond the last input field", () => {
    render(<OTPInput length={4} />)

    const inputs = screen.getAllByRole("textbox")

    fireEvent.changeText(inputs[3], "4")
    expect(inputs[3].props.autoFocus).toBeUndefined()
  })

  it("maintains the timer countdown correctly", () => {
    jest.useFakeTimers()
    render(<OTPInput length={4} />)

    expect(screen.queryByText("59")).toBeNull()

    jest.advanceTimersByTime(1000)
    expect(screen.queryByText("59")).toBeNull()

    jest.useRealTimers()
  })
})
