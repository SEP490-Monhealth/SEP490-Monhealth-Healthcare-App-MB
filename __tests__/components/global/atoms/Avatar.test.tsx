import React from "react"

import { fireEvent, render, screen } from "@testing-library/react-native"

import { Avatar } from "@/components/global/atoms"

import { getInitials } from "@/utils/helpers"

jest.mock("@/utils/helpers", () => ({
  getInitials: jest.fn()
}))

describe("Avatar Component", () => {
  const mockGetInitials = getInitials as jest.Mock

  beforeEach(() => {
    mockGetInitials.mockClear()
  })

  it("renders the image when `source` is valid", () => {
    render(
      <Avatar
        source="https://example.com/avatar.jpg"
        alt="John Doe"
        size={100}
      />
    )

    const image = screen.getByTestId("avatar-image")
    expect(image).toBeTruthy()
    expect(image.props.source.uri).toBe("https://example.com/avatar.jpg")
    expect(image.props.style).toMatchObject({ width: 100, height: 100 })
  })

  it("renders fallback initials when `source` is invalid", () => {
    mockGetInitials.mockReturnValue("JD")
    render(<Avatar source="" alt="John Doe" size={100} />)

    const fallback = screen.getByTestId("avatar-fallback")
    expect(fallback).toBeTruthy()

    const text = screen.getByText("JD")
    expect(text).toBeTruthy()
  })

  it("renders fallback initials when image loading fails", () => {
    mockGetInitials.mockReturnValue("JD")
    render(
      <Avatar
        source="https://example.com/avatar.jpg"
        alt="John Doe"
        size={100}
      />
    )

    const image = screen.getByTestId("avatar-image")
    fireEvent(image, "onError") // Trigger the onError callback

    const fallback = screen.getByTestId("avatar-fallback")
    expect(fallback).toBeTruthy()

    const text = screen.getByText("JD")
    expect(text).toBeTruthy()
  })

  it("applies custom className to the container", () => {
    render(
      <Avatar
        source="https://example.com/avatar.jpg"
        className="custom-class"
      />
    )

    const container = screen.getByTestId("avatar-view")
    expect(container.props.className).toContain("custom-class")
  })

  it("uses default size if `size` is not provided", () => {
    render(<Avatar source="https://example.com/avatar.jpg" alt="John Doe" />)

    const image = screen.getByTestId("avatar-image")
    expect(image.props.style).toMatchObject({ width: 50, height: 50 })
  })
})
