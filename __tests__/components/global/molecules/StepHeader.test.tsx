import React from "react"

import { render, screen } from "@testing-library/react-native"

import { StepHeader } from "@/components/global/molecules"

describe("StepHeader Component", () => {
  it("renders the title correctly", () => {
    render(<StepHeader title="Step Title" description="Step Description" />)

    const title = screen.getByText("Step Title")
    expect(title).toBeTruthy()
    expect(title.props.className).toContain("font-tbold")
    expect(title.props.className).toContain("text-2xl")
    expect(title.props.className).toContain("text-primary")
  })

  it("renders the description correctly", () => {
    render(<StepHeader title="Step Title" description="Step Description" />)

    const description = screen.getByText("Step Description")
    expect(description).toBeTruthy()
    expect(description.props.className).toContain("font-tregular")
    expect(description.props.className).toContain("text-lg")
    expect(description.props.className).toContain("text-accent")
  })

  it("renders both title and description within a VStack", () => {
    render(<StepHeader title="Step Title" description="Step Description" />)

    const vStack = screen.getByTestId("vstack")
    expect(vStack).toBeTruthy()

    const title = screen.getByText("Step Title")
    const description = screen.getByText("Step Description")
    expect(vStack).toContainElement(title)
    expect(vStack).toContainElement(description)
  })
})
