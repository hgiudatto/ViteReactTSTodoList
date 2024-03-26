import React, { useState } from "react";
import InputField from "../InputField";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("InputField", () => {
  it("should render InputField Component correctly", () => {
    render(<InputField todo="" setTodo={""} />);
    const element = screen.getByRole("textbox");
    expect(element).toBeInTheDocument();
  });

  it("should show error message when all the files are not entered", () => {
    render(<InputField todo="" setTodo={""} />);
    const buttonElement = screen.getByRole("button");
    userEvent.click(buttonElement);
    screen.debug();
  });
});
