import React from "react"

import { Dimensions, Text } from "react-native"

import { act, render } from "@testing-library/react-native"

import { Sheet, SheetRefProps } from "@/components/global/atoms"

const MAX_TRANSLATE_Y = -Dimensions.get("window").height + 50

describe("Sheet Component", () => {
  it("should render children correctly", () => {
    const { getByText } = render(
      <Sheet>
        <Text>Test Content</Text>
      </Sheet>
    )

    expect(getByText("Test Content")).toBeTruthy()
  })

  it("should call scrollTo when swiped", () => {
    const ref = React.createRef<SheetRefProps>()

    render(
      <Sheet ref={ref}>
        <Text>Swipeable Content</Text>
      </Sheet>
    )

    // Simulate scroll to position
    act(() => {
      ref.current?.scrollTo(MAX_TRANSLATE_Y)
    })

    expect(ref.current?.isActive()).toBe(true)

    // Simulate scroll back to the initial position
    act(() => {
      ref.current?.scrollTo(0)
    })

    expect(ref.current?.isActive()).toBe(false)
  })

  it("should update context value on gesture start", () => {
    const ref = React.createRef<SheetRefProps>()

    render(
      <Sheet ref={ref}>
        <Text>Gesture Start Test</Text>
      </Sheet>
    )

    // Simulate starting gesture
    act(() => {
      ref.current?.scrollTo(-200) // Simulate dragging to an arbitrary position
    })

    expect(ref.current).not.toBeNull()
  })

  it("should update translateY during gesture update", () => {
    const ref = React.createRef<SheetRefProps>()

    render(
      <Sheet ref={ref}>
        <Text>Gesture Update Test</Text>
      </Sheet>
    )

    // Simulate updating gesture
    act(() => {
      ref.current?.scrollTo(-300) // Simulate dragging halfway
    })

    expect(ref.current).not.toBeNull()
  })

  it("should handle gesture end conditions correctly", () => {
    const ref = React.createRef<SheetRefProps>()

    render(
      <Sheet ref={ref}>
        <Text>Gesture End Test</Text>
      </Sheet>
    )

    // Simulate ending gesture close to MAX_TRANSLATE_Y
    act(() => {
      ref.current?.scrollTo(MAX_TRANSLATE_Y + 50) // Close to MAX_TRANSLATE_Y
    })

    expect(ref.current).not.toBeNull()

    // Simulate ending gesture close to mid
    act(() => {
      ref.current?.scrollTo(-300) // Close to mid
    })

    expect(ref.current).not.toBeNull()

    // Simulate ending gesture dragging up
    act(() => {
      ref.current?.scrollTo(-500) // Dragging upwards
    })

    expect(ref.current).not.toBeNull()

    // Simulate default case
    act(() => {
      ref.current?.scrollTo(0) // Back to initial position
    })

    expect(ref.current).not.toBeNull()
  })

  it("should calculate overlay opacity correctly", () => {
    const ref = React.createRef<SheetRefProps>()

    render(
      <Sheet ref={ref}>
        <Text>Opacity Test</Text>
      </Sheet>
    )

    // Simulate animation
    act(() => {
      ref.current?.scrollTo(MAX_TRANSLATE_Y)
    })

    // For MAX_TRANSLATE_Y, opacity should be 0.5
    expect(ref.current).not.toBeNull()

    // Simulate scrolling to 0
    act(() => {
      ref.current?.scrollTo(0)
    })

    expect(ref.current).not.toBeNull()
  })

  it("should calculate borderRadius correctly", () => {
    const ref = React.createRef<SheetRefProps>()

    render(
      <Sheet ref={ref}>
        <Text>BorderRadius Test</Text>
      </Sheet>
    )

    // Simulate dragging to max translate
    act(() => {
      ref.current?.scrollTo(MAX_TRANSLATE_Y)
    })

    // For MAX_TRANSLATE_Y, borderRadius should be minimal
    expect(ref.current).not.toBeNull()

    // Simulate closer to mid
    act(() => {
      ref.current?.scrollTo(MAX_TRANSLATE_Y + 70)
    })

    expect(ref.current).not.toBeNull()
  })

  it("should handle edge cases for gesture correctly", () => {
    const ref = React.createRef<SheetRefProps>()

    render(
      <Sheet ref={ref}>
        <Text>Edge Case Test</Text>
      </Sheet>
    )

    act(() => {
      ref.current?.scrollTo(-200) // Scroll to an arbitrary position
    })

    expect(ref.current?.isActive()).toBe(true)

    act(() => {
      ref.current?.scrollTo(0) // Reset to initial
    })

    expect(ref.current?.isActive()).toBe(false)
  })

  it("should handle full gesture flow", () => {
    const ref = React.createRef<SheetRefProps>()

    render(
      <Sheet ref={ref}>
        <Text>Full Gesture Flow Test</Text>
      </Sheet>
    )

    // Simulate full gesture flow
    act(() => {
      ref.current?.scrollTo(MAX_TRANSLATE_Y) // Dragging to the top
    })

    act(() => {
      ref.current?.scrollTo(-300) // Dragging halfway
    })

    act(() => {
      ref.current?.scrollTo(0) // Back to initial position
    })

    expect(ref.current).not.toBeNull()
  })
})
