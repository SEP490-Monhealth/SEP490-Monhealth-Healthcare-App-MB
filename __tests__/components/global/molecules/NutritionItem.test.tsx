import React from "react"

import { Text } from "react-native"

import { render } from "@testing-library/react-native"

import { NutritionItem } from "@/components/global/molecules"
import { NutritionSubItem } from "@/components/global/molecules/NutritionItem"

describe("NutritionItem", () => {
  it("renders correctly with label and value", () => {
    const { getByText } = render(
      <NutritionItem label="Calories" value={150} unit="kcal" />
    )

    expect(getByText("Calories")).toBeTruthy()
    expect(getByText("150 kcal")).toBeTruthy()
  })

  it("renders correctly without value", () => {
    const { getByText, queryByText } = render(
      <NutritionItem label="Calories" unit="kcal" />
    )

    expect(getByText("Calories")).toBeTruthy()
    expect(queryByText("kcal")).toBeNull()
  })

  it("renders children correctly", () => {
    const { getByText } = render(
      <NutritionItem label="Macros">
        <Text>Child Component</Text>
      </NutritionItem>
    )

    expect(getByText("Macros")).toBeTruthy()
    expect(getByText("Child Component")).toBeTruthy()
  })
})

describe("NutritionSubItem", () => {
  it("renders correctly with label and value", () => {
    const { getByText } = render(
      <NutritionSubItem label="Protein" value={20} unit="g" />
    )

    expect(getByText("Protein")).toBeTruthy()
    expect(getByText("20 g")).toBeTruthy()
  })

  it("renders correctly with default value", () => {
    const { getByText } = render(<NutritionSubItem label="Fat" unit="g" />)

    expect(getByText("Fat")).toBeTruthy()
    expect(getByText("0 g")).toBeTruthy()
  })
})
