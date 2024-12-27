import React from "react"

import { Text, View } from "react-native"

import { render } from "@testing-library/react-native"

import { ListFooter } from "@/components/global/molecules"

describe("ListFooter", () => {
  it("renders correctly with default props", () => {
    const { getByTestId } = render(
      <ListFooter>
        <View testID="child-view" />
      </ListFooter>
    )

    const footer = getByTestId("child-view")
    expect(footer).toBeTruthy()
  })

  it("applies default class names", () => {
    const { toJSON } = render(
      <ListFooter>
        <View testID="footer-view" />
      </ListFooter>
    )

    const tree = toJSON()
    expect(tree).toMatchSnapshot() // So sánh output với snapshot để đảm bảo các class mặc định tồn tại
  })

  it("merges custom className with default className", () => {
    const customClass = "custom-class"
    const { toJSON } = render(
      <ListFooter className={customClass}>
        <View testID="footer-view" />
      </ListFooter>
    )

    const tree = toJSON()
    expect(tree).toMatchSnapshot() // Snapshot sẽ chứa cả class mặc định lẫn custom class
  })

  it("renders children correctly", () => {
    const { getByText } = render(
      <ListFooter>
        <View>
          <Text>Test Child</Text>
        </View>
      </ListFooter>
    )

    expect(getByText("Test Child")).toBeTruthy()
  })
})
