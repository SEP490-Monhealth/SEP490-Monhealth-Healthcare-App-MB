import React from "react"

import { render } from "@testing-library/react-native"

import { Avatar } from "@/components/global/atoms"

jest.mock("@/utils/helpers", () => ({
  getInitials: jest.fn().mockReturnValue("AB")
}))

describe("Avatar Component", () => {
  it("renders image when source is valid", () => {
    const { getByTestId } = render(
      <Avatar source="https://example.com/avatar.jpg" size={50} />
    )

    const image = getByTestId("avatar-image")
    expect(image.props.source.uri).toBe("https://example.com/avatar.jpg")
  })

  it("displays initials when image fails to load or source is not provided", () => {
    const { getByTestId, getByText } = render(
      <Avatar source="" alt="John Doe" size={50} />
    )

    const fallbackView = getByTestId("avatar-fallback")
    expect(fallbackView).toBeTruthy()

    const initials = getByText("AB")
    expect(initials).toBeTruthy()

    expect(fallbackView.props.style).toEqual({ width: 50, height: 50 })
  })

  it("applies custom size", () => {
    const { getByTestId } = render(
      <Avatar source="https://example.com/avatar.jpg" size={100} />
    )

    const image = getByTestId("avatar-image")
    expect(image.props.style).toEqual({ width: 100, height: 100 })
  })

  it("applies custom className", () => {
    const { getByTestId } = render(
      <Avatar
        source="https://example.com/avatar.jpg"
        size={50}
        className="custom-class"
      />
    )

    const avatarView = getByTestId("avatar-view")
    expect(avatarView.props.className).toContain("custom-class")
  })

  it("displays initials if image fails to load", () => {
    const { getByTestId, getByText } = render(
      <Avatar source="https://invalid-url.jpg" alt="John Doe" size={50} />
    )

    const avatarImage = getByTestId("avatar-image")

    avatarImage.props.onError?.()

    const initials = getByText("AB")
    expect(initials).toBeTruthy()
  })
})
