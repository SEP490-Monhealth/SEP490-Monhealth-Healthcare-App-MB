import React from "react"

import { fireEvent, render, screen } from "@testing-library/react-native"

import { Calendar } from "@/components/global/atoms"

jest.mock("@/utils/formatters", () => ({
  formatUTCDate: jest.fn((date) => date.toISOString().split("T")[0])
}))

describe("Calendar Component", () => {
  it("renders the current month and year", () => {
    render(<Calendar />)

    const currentDate = new Date()
    const header = screen.getByText(
      `Tháng ${currentDate.getMonth() + 1}, ${currentDate.getFullYear()}`
    )

    expect(header).toBeTruthy()
  })

  it("renders the days of the week", () => {
    render(<Calendar />)

    const daysOfWeek = ["T2", "T3", "T4", "T5", "T6", "T7", "CN"]
    daysOfWeek.forEach((day) => {
      const dayText = screen.getByText(day)
      expect(dayText).toBeTruthy()
    })
  })

  it("renders the correct number of days for the current month", () => {
    render(<Calendar />)

    const daysInMonth = new Date(
      new Date().getFullYear(),
      new Date().getMonth() + 1,
      0
    ).getDate()

    const days = screen.getAllByText((content) => !isNaN(Number(content)))
    expect(days.length).toBeGreaterThanOrEqual(daysInMonth)
  })

  it("navigates to the previous month when the left arrow is clicked", () => {
    render(<Calendar />)

    const prevButton = screen.getByRole("button", { name: /ChevronLeft/i })
    fireEvent.press(prevButton)

    const currentDate = new Date()
    currentDate.setMonth(currentDate.getMonth() - 1)

    const updatedHeader = screen.getByText(
      `Tháng ${currentDate.getMonth() + 1}, ${currentDate.getFullYear()}`
    )
    expect(updatedHeader).toBeTruthy()
  })

  it("navigates to the next month when the right arrow is clicked", () => {
    render(<Calendar />)

    const nextButton = screen.getByRole("button", { name: /ChevronRight/i })
    fireEvent.press(nextButton)

    const currentDate = new Date()
    currentDate.setMonth(currentDate.getMonth() + 1)

    const updatedHeader = screen.getByText(
      `Tháng ${currentDate.getMonth() + 1}, ${currentDate.getFullYear()}`
    )
    expect(updatedHeader).toBeTruthy()
  })

  it("highlights the selected date when clicked", () => {
    render(<Calendar />)

    const dayButton = screen.getAllByText("1")[0]
    fireEvent.press(dayButton)

    if (dayButton.parent) {
      expect(dayButton.parent.props.className).toContain(
        "bg-primary text-white"
      )
    }
  })

  it("handles day press and logs the selected date", () => {
    const consoleLogMock = jest.spyOn(console, "log").mockImplementation()

    render(<Calendar />)

    const dayButton = screen.getAllByText("1")[0]
    fireEvent.press(dayButton)

    expect(consoleLogMock).toHaveBeenCalledWith(
      "Selected Date:",
      expect.stringMatching(/^\d{4}-\d{2}-\d{2}$/)
    )

    consoleLogMock.mockRestore()
  })
})
