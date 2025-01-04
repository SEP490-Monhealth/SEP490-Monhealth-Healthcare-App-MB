import React from "react"

import { fireEvent, render, screen } from "@testing-library/react-native"

import { WaterCard } from "@/components/global/molecules"

describe("WaterCard Component", () => {
  it("renders the time, name, and volume correctly", () => {
    render(
      <WaterCard
        time="08:00"
        name="Morning Water"
        volume={250}
        status={false}
      />
    )

    const timeText = screen.getByText("08:00")
    const nameAndVolumeText = screen.getByText("Morning Water, 250 ml")

    expect(timeText).toBeTruthy()
    expect(nameAndVolumeText).toBeTruthy()
  })

  it("renders with the 'switch' variant and calls onSwitchChange when toggled", () => {
    const onSwitchChangeMock = jest.fn()
    render(
      <WaterCard
        variant="switch"
        time="08:00"
        name="Morning Water"
        volume={250}
        status={false}
        onSwitchChange={onSwitchChangeMock}
      />
    )

    const toggle = screen.getByRole("switch")
    fireEvent.press(toggle)

    expect(onSwitchChangeMock).toHaveBeenCalledTimes(1)
    expect(onSwitchChangeMock).toHaveBeenCalledWith(true)
  })

  it("renders with the 'more' variant and calls onMorePress when pressed", () => {
    const onMorePressMock = jest.fn()
    render(
      <WaterCard
        variant="more"
        time="08:00"
        name="Morning Water"
        volume={250}
        status={false}
        onMorePress={onMorePressMock}
      />
    )

    const moreButton = screen.getByTestId("test-icon-more-button")
    fireEvent.press(moreButton)

    expect(onMorePressMock).toHaveBeenCalledTimes(1)
  })

  it("does not call onSwitchChange if 'switch' variant is used but no handler is provided", () => {
    render(
      <WaterCard
        variant="switch"
        time="08:00"
        name="Morning Water"
        volume={250}
        status={false}
      />
    )

    const toggle = screen.getByRole("switch")
    fireEvent.press(toggle)

    // Nothing should happen since no `onSwitchChange` is provided
    expect(screen.queryByRole("switch")).toBeTruthy()
  })

  it("renders the default image for the water icon", () => {
    render(
      <WaterCard
        time="08:00"
        name="Morning Water"
        volume={250}
        status={false}
      />
    )

    const image = screen.getByRole("image")
    expect(image.props.source).toMatchObject(
      require("../../../../public/icons/glass-of-water.png")
    )
  })

  it("renders the correct variant component ('switch' or 'more')", () => {
    render(
      <WaterCard
        variant="switch"
        time="08:00"
        name="Morning Water"
        volume={250}
        status={false}
      />
    )

    const toggle = screen.getByRole("switch")
    expect(toggle).toBeTruthy()

    render(
      <WaterCard
        variant="more"
        time="08:00"
        name="Morning Water"
        volume={250}
        status={false}
      />
    )

    const moreButton = screen.getByTestId("test-icon-more-button")
    expect(moreButton).toBeTruthy()
  })
})
