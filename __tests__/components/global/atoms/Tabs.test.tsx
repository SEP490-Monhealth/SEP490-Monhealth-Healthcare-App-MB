import React from "react"

import { fireEvent, render, screen } from "@testing-library/react-native"

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from "@/components/global/atoms"

describe("Tabs Component Suite", () => {
  it("initializes with the correct default value", () => {
    render(
      <Tabs defaultValue="tab1">
        <TabsList>
          <TabsTrigger value="tab1">Tab 1</TabsTrigger>
          <TabsTrigger value="tab2">Tab 2</TabsTrigger>
        </TabsList>
        <TabsContent value="tab1">Content 1</TabsContent>
        <TabsContent value="tab2">Content 2</TabsContent>
      </Tabs>
    )

    // Verify the default selected tab
    expect(screen.getByText("Tab 1")).toHaveClass("font-tbold text-primary")
    expect(screen.queryByText("Content 1")).toBeTruthy()
    expect(screen.queryByText("Content 2")).toBeNull()
  })

  it("updates selected value when TabsTrigger is clicked", () => {
    render(
      <Tabs defaultValue="tab1">
        <TabsList>
          <TabsTrigger value="tab1">Tab 1</TabsTrigger>
          <TabsTrigger value="tab2">Tab 2</TabsTrigger>
        </TabsList>
        <TabsContent value="tab1">Content 1</TabsContent>
        <TabsContent value="tab2">Content 2</TabsContent>
      </Tabs>
    )

    // Click the second tab trigger
    const tab2Trigger = screen.getByText("Tab 2")
    fireEvent.press(tab2Trigger)

    // Verify the second tab is now selected
    expect(tab2Trigger).toHaveClass("font-tbold text-primary")
    expect(screen.getByText("Content 2")).toBeTruthy()
    expect(screen.queryByText("Content 1")).toBeNull()
  })

  it("renders TabsList with correct alignment", () => {
    const { rerender } = render(
      <Tabs defaultValue="tab1">
        <TabsList center>
          <TabsTrigger value="tab1">Tab 1</TabsTrigger>
        </TabsList>
      </Tabs>
    )

    // Verify center alignment
    expect(screen.getByText("Tab 1").parent).toHaveStyle({
      justifyContent: "center"
    })

    rerender(
      <Tabs defaultValue="tab1">
        <TabsList center={false}>
          <TabsTrigger value="tab1">Tab 1</TabsTrigger>
        </TabsList>
      </Tabs>
    )

    // Verify justify-between alignment
    expect(screen.getByText("Tab 1").parent).toHaveStyle({
      justifyContent: "space-between"
    })
  })

  it("applies correct styles for TabsTrigger selection state", () => {
    render(
      <Tabs defaultValue="tab1">
        <TabsList>
          <TabsTrigger value="tab1">Tab 1</TabsTrigger>
          <TabsTrigger value="tab2">Tab 2</TabsTrigger>
        </TabsList>
      </Tabs>
    )

    const tab1Trigger = screen.getByText("Tab 1")
    const tab2Trigger = screen.getByText("Tab 2")

    // Verify styles for selected and unselected states
    expect(tab1Trigger).toHaveClass("font-tbold text-primary")
    expect(tab2Trigger).toHaveClass("font-tmedium text-secondary")
  })

  it("renders TabsContent only when selected", () => {
    render(
      <Tabs defaultValue="tab1">
        <TabsContent value="tab1">Content 1</TabsContent>
        <TabsContent value="tab2">Content 2</TabsContent>
      </Tabs>
    )

    // Verify only the selected tab content is displayed
    expect(screen.getByText("Content 1")).toBeTruthy()
    expect(screen.queryByText("Content 2")).toBeNull()
  })

  it("applies correct margin-top for TabsContent", () => {
    const { rerender } = render(
      <Tabs defaultValue="tab1" contentMarginTop={10}>
        <TabsContent value="tab1">Content 1</TabsContent>
      </Tabs>
    )

    // Verify global margin-top
    expect(screen.getByText("Content 1").parent).toHaveStyle({ marginTop: 10 })

    rerender(
      <Tabs defaultValue="tab1">
        <TabsContent value="tab1" contentMarginTop={20}>
          Content 1
        </TabsContent>
      </Tabs>
    )

    // Verify local margin-top
    expect(screen.getByText("Content 1").parent).toHaveStyle({ marginTop: 20 })
  })
})

it("throws an error when TabsTrigger is used outside Tabs context", () => {
  // Suppress console.error temporarily to avoid noisy logs during the test
  const consoleError = console.error
  console.error = jest.fn()

  expect(() =>
    render(<TabsTrigger value="tab1">Tab 1</TabsTrigger>)
  ).toThrowError("TabsTrigger must be used within a Tabs component")

  // Restore console.error
  console.error = consoleError
})

it("throws an error when TabsContent is used outside Tabs context", () => {
  // Suppress console.error temporarily to avoid noisy logs during the test
  const consoleError = console.error
  console.error = jest.fn()

  expect(() =>
    render(<TabsContent value="tab1">Content 1</TabsContent>)
  ).toThrowError("TabsContent must be used within a Tabs component")

  // Restore console.error
  console.error = consoleError
})
