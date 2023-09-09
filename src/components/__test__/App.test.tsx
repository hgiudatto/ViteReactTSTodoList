import { render, screen } from "@testing-library/react";
import React from "react";
import App from "../../App";

test("Renders main page correctly", async () => {
  render(<App />);
  const buttonCount = await screen.findByRole("button");
  expect(buttonCount.innerHTML).toBe("count is 0");
  expect(true).toBeTruthy();
});

describe("App", () => {
  it("should render hello world", () => {
    //Arrange
    render(<App />);
    const heading = "Hello world";
    // Act
    // Expect
    expect(
      screen.getByRole("heading", { level: 1 })
    ).toHaveTextContent(heading);
  });
});
