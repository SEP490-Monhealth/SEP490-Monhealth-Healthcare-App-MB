import React from "react"

import { AnimatedCircularProgress } from "react-native-circular-progress"

import { render, screen } from "@testing-library/react-native"

import { ArcProgress } from "@/components/global/molecules"

// Mock AnimatedCircularProgress
jest.mock("react-native-circular-progress", () => ({
  AnimatedCircularProgress: jest.fn(() => null)
}))

describe("ArcProgress Component", () => {
  it("renders correctly with default props", () => {
    render(<ArcProgress size={100} width={10} value={50} label="Test Label" />)

    // Verify AnimatedCircularProgress is rendered
    expect(AnimatedCircularProgress).toHaveBeenCalledWith(
      expect.objectContaining({
        size: 100,
        width: 10,
        fill: 0, // Default fill
        tintColor: "#34d399", // COLORS.primary
        backgroundColor: "#F1F5F9",
        arcSweepAngle: 360,
        rotation: 0
      }),
      {}
    )

    // Ensure label and value are not shown without centerCircle
    expect(screen.queryByText("50")).toBeNull()
    expect(screen.queryByText("Test Label")).toBeNull()
  })

  it("renders CenterCircle when centerCircle is true", () => {
    render(
      <ArcProgress
        centerCircle
        size={150}
        width={15}
        fill={75}
        value={50}
        maxValue={100}
        label="Center Label"
      />
    )

    // Check if CenterCircle is displayed
    expect(screen.getByText("50 / 100")).toBeTruthy()
    expect(screen.getByText("Center Label")).toBeTruthy()
  })

  it("displays value as percentage when valueType is percentage", () => {
    render(
      <ArcProgress
        centerCircle
        size={150}
        width={15}
        fill={75}
        value={75}
        valueType="percentage"
        label="Percentage Label"
      />
    )

    // Verify value is displayed as percentage
    expect(screen.getByText("75%")).toBeTruthy()
    expect(screen.getByText("Percentage Label")).toBeTruthy()
  })

  it("renders with default variant 'md'", () => {
    render(
      <ArcProgress
        size={100}
        width={10}
        value={50}
        maxValue={100}
        label="Default Variant"
        centerCircle
      />
    )

    // Ensure the label is displayed for variant 'md'
    expect(screen.getByText("50 / 100")).toBeTruthy() // `valueType` is "number" by default
    expect(screen.getByText("Default Variant")).toBeTruthy()
  })

  it("renders valueType as 'number' explicitly", () => {
    render(
      <ArcProgress
        size={100}
        width={10}
        value={30}
        maxValue={50}
        label="Number Value Type"
        valueType="number"
        centerCircle
      />
    )

    // Verify that value and maxValue are correctly displayed
    expect(screen.getByText("30 / 50")).toBeTruthy()
    expect(screen.getByText("Number Value Type")).toBeTruthy()
  })

  it("renders with variant 'md' when no variant is specified", () => {
    render(
      <ArcProgress
        size={120}
        width={12}
        value={75}
        maxValue={100}
        label="No Variant Specified"
        centerCircle
      />
    )

    // Since the default variant is 'md', check for proper text sizes
    expect(screen.getByText("75 / 100")).toBeTruthy()
    expect(screen.getByText("No Variant Specified")).toBeTruthy()
  })

  it("applies custom styles and colors", () => {
    render(
      <ArcProgress
        size={200}
        width={20}
        fill={50}
        tintColor="#FF0000"
        backgroundColor="#00FF00"
        arcSweepAngle={180}
        rotation={90}
      />
    )

    // Verify AnimatedCircularProgress receives custom props
    expect(AnimatedCircularProgress).toHaveBeenCalledWith(
      expect.objectContaining({
        size: 200,
        width: 20,
        fill: 50,
        tintColor: "#FF0000",
        backgroundColor: "#00FF00",
        arcSweepAngle: 180,
        rotation: 90
      }),
      {}
    )
  })
})
