import React from "react"

import { View } from "react-native"

import { fireEvent, render, screen } from "@testing-library/react-native"

import { Chip } from "@/components/global/atoms"

describe("Chip Component", () => {
  it("renders the chip with default props", () => {
    render(<Chip label="Default Chip" />)

    const chip = screen.getByText("Default Chip")
    expect(chip).toBeTruthy()

    const container = chip.parent
    expect(container.props.className).toContain("bg-muted")
    expect(container.props.className).toContain("px-3.5 py-1.5 rounded-xl")
  })

  it("renders the chip with selected variant", () => {
    render(<Chip label="Selected Chip" variant="selected" />)

    const chip = screen.getByText("Selected Chip")
    expect(chip).toBeTruthy()

    const container = chip.parent
    expect(container.props.className).toContain("bg-primary")
  })

  it("renders the chip with lemon variant", () => {
    render(<Chip label="Lemon Chip" variant="lemon" />)

    const chip = screen.getByText("Lemon Chip")
    expect(chip).toBeTruthy()

    const container = chip.parent
    expect(container.props.className).toContain("bg-yellow-400")
  })

  it("renders the chip with custom size", () => {
    render(<Chip label="Large Chip" size="lg" />)

    const chip = screen.getByText("Large Chip")
    expect(chip).toBeTruthy()

    const container = chip.parent
    expect(container.props.className).toContain("px-6 py-6 rounded-2xl")
  })

  it("renders the chip with border", () => {
    render(<Chip label="Bordered Chip" border={true} />)

    const chip = screen.getByText("Bordered Chip")
    expect(chip).toBeTruthy()

    const container = chip.parent
    expect(container.props.style).toHaveProperty("borderWidth", 1)
    expect(container.props.className).toContain("border-border")
  })

  it("renders the chip with custom border width", () => {
    render(<Chip label="Custom Border" border={true} borderWidth={2} />)

    const chip = screen.getByText("Custom Border")
    expect(chip).toBeTruthy()

    const container = chip.parent
    expect(container.props.style).toHaveProperty("borderWidth", 2)
  })

  it("renders the chip with an icon", () => {
    render(<Chip label="Chip with Icon" icon={<View testID="icon" />} />)

    const icon = screen.getByTestId("icon")
    expect(icon).toBeTruthy()
  })

  it("renders the chip with description", () => {
    render(
      <Chip label="Chip with Description" description="This is a description" />
    )

    const description = screen.getByText("This is a description")
    expect(description).toBeTruthy()
  })

  it("calls onPress when the chip is pressed", () => {
    const onPressMock = jest.fn()
    render(<Chip label="Pressable Chip" onPress={onPressMock} />)

    const chip = screen.getByText("Pressable Chip").parent
    fireEvent.press(chip)

    expect(onPressMock).toHaveBeenCalledTimes(1)
  })

  it("applies custom className", () => {
    render(<Chip label="Custom Class Chip" className="custom-class" />)

    const chip = screen.getByText("Custom Class Chip").parent
    expect(chip.props.className).toContain("custom-class")
  })
})
