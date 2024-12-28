import React from "react"

import { View } from "react-native"

import { render, screen } from "@testing-library/react-native"

import { ListHeader } from "@/components/global/molecules"

// Mock cn utility
jest.mock("@/lib/utils", () => ({
  cn: jest.fn((...classes: string[]) => classes.join(" "))
}))

describe("ListHeader Component", () => {
  it("renders children correctly", () => {
    render(
      <ListHeader>
        <View testID="child-view" />
      </ListHeader>
    )

    expect(screen.getByTestId("child-view")).toBeTruthy()
  })

  it("applies default class name", () => {
    render(<ListHeader />)

    expect(screen.getByTestId("root-view").props.className).toContain(
      "bg-background"
    )
  })

  it("appends additional className prop", () => {
    render(<ListHeader className="custom-class" />)

    expect(screen.getByTestId("root-view").props.className).toContain(
      "bg-background custom-class"
    )
  })
})
