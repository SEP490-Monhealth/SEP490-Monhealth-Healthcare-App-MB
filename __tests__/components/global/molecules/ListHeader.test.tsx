import React from "react"

import { Text, View } from "react-native"

import { render } from "@testing-library/react-native"

import { ListHeader } from "@/components/global/molecules"

describe("ListHeader", () => {
  it("renders correctly with default props", () => {
    const { getByTestId } = render(
      <ListHeader>
        <View testID="child-view" />
      </ListHeader>
    )

    const header = getByTestId("child-view")
    expect(header).toBeTruthy()
  })

  it("applies default class names", () => {
    const { toJSON } = render(
      <ListHeader>
        <View testID="header-view" />
      </ListHeader>
    )

    const tree = toJSON()
    expect(tree).toMatchSnapshot() // Kiểm tra snapshot để đảm bảo các class mặc định được áp dụng
  })

  it("merges custom className with default className", () => {
    const customClass = "custom-class"
    const { toJSON } = render(
      <ListHeader className={customClass}>
        <View testID="header-view" />
      </ListHeader>
    )

    const tree = toJSON()
    expect(tree).toMatchSnapshot() // Snapshot sẽ lưu cả class mặc định và custom class
  })

  it("renders children correctly", () => {
    const { getByText } = render(
      <ListHeader>
        <View>
          <Text>Test Header Child</Text>
        </View>
      </ListHeader>
    )

    expect(getByText("Test Header Child")).toBeTruthy()
  })
})
