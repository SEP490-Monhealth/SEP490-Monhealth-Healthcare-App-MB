import React from "react"

import { AnimatedCircularProgress } from "react-native-circular-progress"

import { render } from "@testing-library/react-native"

import { CircularProgress } from "@/components/global/molecules"

jest.mock("react-native-circular-progress", () => ({
  AnimatedCircularProgress: jest.fn().mockImplementation(() => null)
}))

describe("CircularProgress component", () => {
  it("renders correctly with default props", () => {
    const { getByTestId } = render(<CircularProgress size={100} width={10} />)

    expect(getByTestId("test-circular-progress")).toBeTruthy()
    expect(AnimatedCircularProgress).toHaveBeenCalledWith(
      expect.objectContaining({
        size: 100,
        width: 10,
        fill: 0,
        tintColor: "#334155",
        backgroundColor: "#F1F5F9",
        rotation: 90,
        lineCap: "round"
      }),
      {}
    )
  })

  it("renders with custom props", () => {
    const { getByTestId } = render(
      <CircularProgress
        size={150}
        width={15}
        fill={50}
        tintColor="red"
        backgroundColor="blue"
        rotation={180}
        className="custom-class"
      />
    )

    expect(getByTestId("test-circular-progress")).toBeTruthy()
    expect(AnimatedCircularProgress).toHaveBeenCalledWith(
      expect.objectContaining({
        size: 150,
        width: 15,
        fill: 50,
        tintColor: "red",
        backgroundColor: "blue",
        rotation: 180,
        lineCap: "round"
      }),
      {}
    )
  })

  it("applies the className correctly", () => {
    const { getByTestId } = render(
      <CircularProgress size={100} width={10} className="test-class" />
    )

    const container = getByTestId("test-circular-progress")
    expect(container.props.className).toContain("test-class")
  })
})
