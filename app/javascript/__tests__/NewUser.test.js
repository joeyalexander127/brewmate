import React from "react";
import { screen, render, fireEvent } from "@testing-library/react";
import NewUser from "../components/pages/NewUser";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";

describe("<NewUser />", () => {
  it("renders without crashing", () => {
    render(
      <BrowserRouter>
        <NewUser />
      </BrowserRouter>
    );

    screen;
    const text = screen.getByText(/welcome to brewMate!/i);
    expect(text).toBeInTheDocument();
  });

  it("displays a functional button that calls upon the navigate function", () => {
    const navigate = jest.fn();

    render(
      <BrowserRouter>
        <NewUser />
      </BrowserRouter>
    );
    const button = screen.getByRole("button");
    fireEvent.click(button);
    expect(navigate).toBeCalled;
  });
});

export default NewUser;
