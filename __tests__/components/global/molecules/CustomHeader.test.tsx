import React from "react"

import { Text } from "react-native"

import { useRouter } from "expo-router"

import { fireEvent, render, screen } from "@testing-library/react-native"

import { CustomHeader } from "@/components/global/molecules"

jest.mock("expo-router", () => ({
  useRouter: jest.fn()
}))

describe("CustomHeader Component", () => {
  const mockRouter = {
    back: jest.fn()
  }

  beforeEach(() => {
    ;(useRouter as jest.Mock).mockReturnValue(mockRouter)
  })

  it("renders with string content", () => {
    render(<CustomHeader content="Header Title" />)

    const text = screen.getByText("Header Title")
    expect(text).toBeTruthy()
  })

  it("renders with ReactNode content", () => {
    render(
      <CustomHeader
        content={<Text testID="custom-content">Custom Node</Text>}
      />
    )

    const customContent = screen.getByTestId("custom-content")
    expect(customContent).toBeTruthy()
    expect(customContent.props.children).toBe("Custom Node")
  })

  it("calls router.back when back button is pressed and onBackPress is not provided", () => {
    render(<CustomHeader content="Header Title" />)

    const backButton = screen.getByTestId("test-icon-more-button")
    fireEvent.press(backButton)

    expect(mockRouter.back).toHaveBeenCalledTimes(1)
  })

  it("calls onBackPress when provided and back button is pressed", () => {
    const onBackPressMock = jest.fn()
    render(
      <CustomHeader content="Header Title" onBackPress={onBackPressMock} />
    )

    const backButton = screen.getByTestId("test-icon-more-button")
    fireEvent.press(backButton)

    expect(onBackPressMock).toHaveBeenCalledTimes(1)
    expect(mockRouter.back).not.toHaveBeenCalled()
  })

  it("renders IconButton with the correct icon", () => {
    render(<CustomHeader content="Header Title" />)

    const backButton = screen.getByTestId("test-icon-more-button")
    expect(backButton).toBeTruthy()
  })
})
