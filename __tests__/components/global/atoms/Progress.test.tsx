import React from "react"

import { Animated } from "react-native"

import { render, screen } from "@testing-library/react-native"

import { Progress } from "@/components/global/atoms"

jest.mock("react-native", () => {
  const originalModule = jest.requireActual("react-native")
  return {
    ...originalModule,
    Animated: {
      ...originalModule.Animated,
      timing: jest.fn(() => ({
        start: jest.fn()
      }))
    }
  }
})

describe("Progress Component", () => {
  it("renders with default props", () => {
    render(<Progress progress={50} />)

    const progressContainer = screen.getByTestId("progress-container")
    expect(progressContainer).toBeTruthy()

    const animatedView = screen.getByTestId("progress-bar")
    expect(animatedView.props.style).toEqual(
      expect.objectContaining({
        backgroundColor: expect.any(String)
      })
    )
  })

  it("renders with custom height and color", () => {
    render(<Progress progress={50} height={20} color="#FF0000" />)

    const progressBar = screen.getByTestId("progress-bar")
    expect(progressBar.props.style).toEqual(
      expect.objectContaining({
        backgroundColor: "#FF0000"
      })
    )
  })

  it("clamps progress value between 0 and 100", () => {
    render(<Progress progress={150} />)

    expect(Animated.timing).toHaveBeenCalledWith(
      expect.objectContaining({
        toValue: 100
      }),
      expect.any(Object)
    )

    render(<Progress progress={-10} />)

    expect(Animated.timing).toHaveBeenCalledWith(
      expect.objectContaining({
        toValue: 0
      }),
      expect.any(Object)
    )
  })

  it("displays labels when provided", () => {
    render(
      <Progress progress={50} labelStart="Start Label" labelEnd="End Label" />
    )

    const startLabel = screen.getByText("Start Label")
    const endLabel = screen.getByText("End Label")

    expect(startLabel).toBeTruthy()
    expect(endLabel).toBeTruthy()
  })

  it("hides labels when not provided", () => {
    render(<Progress progress={50} />)

    const startLabel = screen.queryByText("Start Label")
    const endLabel = screen.queryByText("End Label")

    expect(startLabel).toBeNull()
    expect(endLabel).toBeNull()
  })

  it("applies custom className", () => {
    render(<Progress progress={50} className="custom-class" />)

    const progressContainer = screen.getByTestId("progress-container")
    expect(progressContainer.props.className).toContain("custom-class")
  })
})
