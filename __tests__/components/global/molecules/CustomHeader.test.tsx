import React from "react";
import { useRouter } from "expo-router";
import { fireEvent, render } from "@testing-library/react-native";
import { CustomHeader } from "@/components/global/molecules";

jest.mock("expo-router", () => ({
  useRouter: jest.fn(),
}));

describe("CustomHeader", () => {
  const mockRouter = { back: jest.fn() };

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders the IconButton and content properly", () => {
    const content = "Header Content"; // Pass plain text as the content
    const { getByTestId, getByText } = render(<CustomHeader content={content} />);

    // Verify the testID for content
    expect(getByTestId("CustomHeaderContent")).toBeTruthy();

    // Verify the rendered text inside CustomHeaderContent
    expect(getByText("Header Content")).toBeTruthy();
  });

  it("calls router.back when the back button is pressed", () => {
    const { getByTestId } = render(<CustomHeader content={""} />);
    const backButton = getByTestId("BackButton");

    // Simulate back button press
    fireEvent.press(backButton);

    // Verify router.back is called
    expect(mockRouter.back).toHaveBeenCalled();
  });
});
