import React from "react"

import { Text } from "react-native"

import { useRouter } from "expo-router"

import { fireEvent, render, screen } from "@testing-library/react-native"

import { CustomHeader } from "@/components/global/molecules"

// Mock the router
jest.mock("expo-router", () => ({
  useRouter: jest.fn()
}))

describe("CustomHeader Component", () => {
  const mockedRouter = {
    back: jest.fn()
  }

  beforeEach(() => {
    jest.clearAllMocks()
    ;(useRouter as jest.Mock).mockReturnValue(mockedRouter)
  })

  it("renders correctly with string content", () => {
    render(<CustomHeader content="Header Title" />)

    expect(screen.getByText("Header Title")).toBeTruthy()
    expect(screen.getByTestId("test-header-custom")).toBeTruthy()
  })

  it("renders correctly with JSX content", () => {
    render(
      <CustomHeader
        content={
          <Text testID="test-custom-jsx-content">Custom JSX Content</Text>
        }
      />
    )

    expect(screen.getByTestId("test-header-custom")).toBeTruthy()
    expect(screen.getByTestId("test-custom-jsx-content")).toBeTruthy()
    expect(screen.getByText("Custom JSX Content")).toBeTruthy()
  })

  it("calls router.back() when the back button is pressed", () => {
    render(<CustomHeader content="Header Title" />)

    const backButton = screen.getByTestId("test-icon-more-button")
    fireEvent.press(backButton)

    expect(mockedRouter.back).toHaveBeenCalled()
  })
})
