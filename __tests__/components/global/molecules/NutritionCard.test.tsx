import React from "react"

import { render } from "@testing-library/react-native"

import { NutritionCard } from "@/components/global/molecules"

describe("NutritionCard", () => {
  it("renders correctly with default props", () => {
    const { getByText } = render(<NutritionCard label="Calories" value={150} />)

    expect(getByText("Calories")).toBeTruthy()
    expect(getByText("150")).toBeTruthy()
  })

  it("renders with reverse layout when reverse is true", () => {
    const { getByText } = render(
      <NutritionCard label="Protein" value={25} reverse={true} />
    )

    expect(getByText("Protein")).toBeTruthy()
    expect(getByText("25")).toBeTruthy()
  })

  it("renders with fillColor and custom color", () => {
    const { getByText } = render(
      <NutritionCard label="Carbs" value={50} fillColor={true} color="blue" />
    )

    const valueText = getByText("50")
    expect(valueText).toBeTruthy()
    expect(valueText.props.style).toEqual({ color: "blue" })
  })

  it("renders with unit when showUnit is true", () => {
    const { getByText } = render(
      <NutritionCard label="Fat" value={10} showUnit={true} unit="g" />
    )

    expect(getByText("Fat")).toBeTruthy()
    expect(getByText("10 g")).toBeTruthy()
  })

  it("renders correctly with all props", () => {
    const { getByText } = render(
      <NutritionCard
        label="Fiber"
        value={5}
        reverse={true}
        fillColor={true}
        color="green"
        showUnit={true}
        unit="g"
      />
    )

    expect(getByText("Fiber")).toBeTruthy()
    const valueText = getByText("5 g")
    expect(valueText).toBeTruthy()
    expect(valueText.props.style).toEqual({ color: "green" })
  })
})
