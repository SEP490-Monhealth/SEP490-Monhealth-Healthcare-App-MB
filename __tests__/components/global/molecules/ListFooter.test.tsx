import React from "react"

import { View } from "react-native"

import { render, screen } from "@testing-library/react-native"

import { ListFooter } from "@/components/global/molecules"

describe("ListFooter Component", () => {
  it("renders children correctly", () => {
    render(
      <ListFooter>
        <View testID="child-view" />
      </ListFooter>
    )

    expect(screen.getByTestId("child-view")).toBeTruthy()
  })

  it("applies default class name", () => {
    render(<ListFooter />)

    expect(screen.getByTestId("root-view").props.className).toContain(
      "mt-8 pb-4"
    )
  })

  it("appends additional className prop", () => {
    render(<ListFooter className="custom-class" />)

    expect(screen.getByTestId("root-view").props.className).toContain(
      "mt-8 pb-4 custom-class"
    )
  })
})
