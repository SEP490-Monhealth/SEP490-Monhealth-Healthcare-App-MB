import React from "react"

import { fireEvent, render, screen } from "@testing-library/react-native"

import { WaterReminderCard } from "@/components/global/molecules"

describe("WaterReminderCard Component", () => {
  it("renders the time, name, and volume correctly", () => {
    render(
      <WaterReminderCard
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
      <WaterReminderCard
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
      <WaterReminderCard
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
      <WaterReminderCard
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
      <WaterReminderCard
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
      <WaterReminderCard
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
      <WaterReminderCard
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
