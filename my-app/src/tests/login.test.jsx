import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { App } from "../app";
import React from "react";
import "@testing-library/jest-dom";

test("User login component should render", async () => {
  const { getByText, getByLabelText } = render(<App />);

  getByText("Welcome to the bank");

  await userEvent.click(screen.getByText("Login"));
  expect(screen.getByText("Login to your account")).toBeInTheDocument();

  userEvent.type(getByLabelText("Email"), "abel@mit.edu");
  userEvent.type(getByLabelText("Password"), "secret");
  userEvent.click(getByText("Login"));
});
