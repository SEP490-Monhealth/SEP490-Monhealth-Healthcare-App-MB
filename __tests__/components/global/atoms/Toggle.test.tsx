import React from "react"

import { fireEvent, render, screen } from "@testing-library/react-native"

import { Toggle } from "@/components/global/atoms"

describe("Toggle Component", () => {
  it("renders the toggle with default props", () => {
    const mockOnValueChange = jest.fn()
    render(<Toggle value={false} onValueChange={mockOnValueChange} />)

    const toggle = screen.getByRole("switch")
    expect(toggle).toBeTruthy()
    expect(toggle.props.value).toBe(false)
    expect(toggle.props.trackColor).toEqual({
      false: "#F5F5F5",
      true: "#E0F7FA"
    })
    expect(toggle.props.thumbColor).toBe("#E3F2FD")
  })

  it("renders the toggle with custom track and thumb colors", () => {
    const mockOnValueChange = jest.fn()
    render(
      <Toggle
        value={true}
        onValueChange={mockOnValueChange}
        trackColor={{ false: "#FFCDD2", true: "#C8E6C9" }}
        thumbColorFalse="#FFCDD2"
        thumbColorTrue="#C8E6C9"
      />
    )

    const toggle = screen.getByRole("switch")
    expect(toggle.props.trackColor).toEqual({
      false: "#FFCDD2",
      true: "#C8E6C9"
    })
    expect(toggle.props.thumbColor).toBe("#C8E6C9")
  })

  it("calls onValueChange when the toggle is switched", () => {
    const mockOnValueChange = jest.fn()
    render(<Toggle value={false} onValueChange={mockOnValueChange} />)

    const toggle = screen.getByRole("switch")
    fireEvent(toggle, "valueChange", true)

    expect(mockOnValueChange).toHaveBeenCalledTimes(1)
    expect(mockOnValueChange).toHaveBeenCalledWith(true)
  })

  it("renders the toggle in an active state", () => {
    render(<Toggle value={true} onValueChange={() => {}} />)

    const toggle = screen.getByRole("switch")
    expect(toggle.props.value).toBe(true)
    expect(toggle.props.thumbColor).toBe("#B2EBF2")
  })

  it("renders the toggle in an inactive state", () => {
    render(<Toggle value={false} onValueChange={() => {}} />)

    const toggle = screen.getByRole("switch")
    expect(toggle.props.value).toBe(false)
    expect(toggle.props.thumbColor).toBe("#E3F2FD")
  })

  it("applies the custom transform styles", () => {
    render(<Toggle value={false} onValueChange={() => {}} />)

    const toggle = screen.getByRole("switch")
    expect(toggle.props.style).toEqual({
      transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }]
    })
  })
})
