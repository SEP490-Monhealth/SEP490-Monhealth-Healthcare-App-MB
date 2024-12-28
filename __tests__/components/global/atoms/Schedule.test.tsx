import React from "react"

import { useRouter } from "expo-router"

import { fireEvent, render, screen } from "@testing-library/react-native"

import { Schedule } from "@/components/global/atoms"

// Mock the `expo-router`
jest.mock("expo-router", () => ({
  useRouter: jest.fn()
}))

describe("Schedule Component", () => {
  const mockedRouter = {
    push: jest.fn()
  }

  beforeEach(() => {
    jest.clearAllMocks()
    ;(useRouter as jest.Mock).mockReturnValue(mockedRouter)
  })

  it("renders the correct month and year", () => {
    render(<Schedule initialDate={new Date("2023-12-01T00:00:00Z")} />)

    expect(screen.getByText("thg 12, 2023")).toBeTruthy()
  })

  it("defaults to current date when initialDate is invalid", () => {
    render(<Schedule initialDate={new Date("invalid-date")} />)

    const today = new Date()
    const monthYearText = today.toLocaleString("vi-VN", {
      month: "short",
      year: "numeric"
    })

    expect(screen.getByText(monthYearText)).toBeTruthy()
  })

  it("renders the correct number of days in a month", () => {
    render(<Schedule initialDate={new Date("2023-02-01T00:00:00Z")} />)

    const dayItems = screen.getAllByText(/^[1-9]$|^[12][0-9]$|^3[01]$/)
    expect(dayItems.length).toBe(28)
  })

  it("updates selected day when a DayItem is clicked", () => {
    render(<Schedule initialDate={new Date("2023-12-01T00:00:00Z")} />)

    const day10 = screen.getByText("10")
    fireEvent.press(day10)

    expect(day10.parent).toHaveClass("bg-primary")
    expect(day10).toHaveClass("text-white")
  })

  it("scrolls to the selected date on mount", () => {
    const flatListRefMock = { scrollToIndex: jest.fn() }
    jest
      .spyOn(React, "useRef")
      .mockReturnValueOnce({ current: flatListRefMock })

    render(<Schedule initialDate={new Date("2023-12-15T00:00:00Z")} />)

    expect(flatListRefMock.scrollToIndex).toHaveBeenCalledWith({
      index: 14,
      animated: true
    })
  })

  it("handles `onScrollToIndexFailed` gracefully", () => {
    jest.useFakeTimers()

    const flatListRefMock = { scrollToIndex: jest.fn() }
    jest
      .spyOn(React, "useRef")
      .mockReturnValueOnce({ current: flatListRefMock })

    const { container } = render(
      <Schedule initialDate={new Date("2023-12-01T00:00:00Z")} />
    )
    const flatList = container.findByType("FlatList")

    flatList.props.onScrollToIndexFailed({ index: 5 })
    jest.advanceTimersByTime(500)

    expect(flatListRefMock.scrollToIndex).toHaveBeenCalledWith({
      index: 5,
      animated: true
    })

    jest.useRealTimers()
  })

  it("navigates to the calendar page when calendar icon is pressed", () => {
    render(<Schedule initialDate={new Date()} />)

    const calendarIcon = screen.getByRole("button")
    fireEvent.press(calendarIcon)

    expect(mockedRouter.push).toHaveBeenCalledWith("/schedules/calendar")
  })
})
