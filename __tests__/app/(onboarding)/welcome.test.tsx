import React from "react"

import { Router, useRouter } from "expo-router"

import WelcomeScreen from "@/app/onboarding/welcome"
import { fireEvent, render } from "@testing-library/react-native"

// Mock the useRouter hook
jest.mock("expo-router", () => ({
  useRouter: jest.fn()
}))

describe("WelcomeScreen", () => {
  let router: jest.Mocked<Router>

  beforeEach(() => {
    router = {
      replace: jest.fn(),
      push: jest.fn(),
      back: jest.fn(),
      prefetch: jest.fn(),
      reload: jest.fn()
    } as unknown as jest.Mocked<Router>
    ;(useRouter as jest.Mock).mockReturnValue(router)
  })

  it("renders correctly", () => {
    const { getByText } = render(<WelcomeScreen />)

    // Check for main text elements
    expect(getByText("Hoàn thành mục tiêu sức khỏe của bạn")).toBeTruthy()
    expect(
      getByText("Với công cụ theo dõi dinh dưỡng và bài tập cá nhân hóa")
    ).toBeTruthy()

    // Check for button text
    expect(getByText("Google")).toBeTruthy()
    expect(getByText("Tiếp tục")).toBeTruthy()
  })

  it("navigates to home when 'Google' is pressed", () => {
    const { getByText } = render(<WelcomeScreen />)

    // Simulate button press
    fireEvent.press(getByText("Google"))

    // Verify navigation
    expect(router.replace).toHaveBeenCalledWith("/tabs/home")
  })

  it("navigates to sign-in screen when 'Tiếp tục' is pressed", () => {
    const { getByText } = render(<WelcomeScreen />)

    // Simulate button press
    fireEvent.press(getByText("Tiếp tục"))

    // Verify navigation
    expect(router.push).toHaveBeenCalledWith("/auth/sign-in")
  })

  it("renders terms and privacy policy text", () => {
    const { getByText } = render(<WelcomeScreen />)

    // Check for terms and privacy policy text
    expect(getByText("Điều khoản dịch vụ")).toBeTruthy()
    expect(getByText("Chính sách quyền riêng tư")).toBeTruthy()
  })
})
