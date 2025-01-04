import React from "react"

import { fireEvent, render, screen } from "@testing-library/react-native"

import { SheetItem } from "@/components/global/atoms"

describe("SheetItem Component", () => {
  it("renders the item with default styling when not selected", () => {
    render(<SheetItem item="Option 1" isSelected={false} onSelect={() => {}} />)

    const itemText = screen.getByText("Option 1")
    expect(itemText).toBeTruthy()
    expect(itemText.props.className).toContain("text-base")
    expect(itemText.props.className).toContain("text-accent")
  })

  it("renders the item with selected styling when isSelected is true", () => {
    render(<SheetItem item="Option 1" isSelected={true} onSelect={() => {}} />)

    const itemText = screen.getByText("Option 1")
    expect(itemText).toBeTruthy()
    expect(itemText.props.className).toContain("font-tmedium")
    expect(itemText.props.className).toContain("text-lg")
    expect(itemText.props.className).toContain("text-primary")
  })

  it("calls onSelect with the correct item when pressed", () => {
    const onSelectMock = jest.fn()
    render(
      <SheetItem item="Option 1" isSelected={false} onSelect={onSelectMock} />
    )

    const button = screen.getByRole("button")
    fireEvent.press(button)

    expect(onSelectMock).toHaveBeenCalledTimes(1)
    expect(onSelectMock).toHaveBeenCalledWith("Option 1")
  })
})
