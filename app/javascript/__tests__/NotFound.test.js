import React from "react";
import { screen, render } from "@testing-library/react";
import NotFound from "../components/pages/NotFound";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";

describe("<NotFound />", () => {
  it("renders without crashing", () => {
    render(
      <BrowserRouter>
        <NotFound />
      </BrowserRouter>
    );

    screen;
    const text = screen.getByText(/Beers Not Found/i);
    expect(text).toBeInTheDocument();
  });
  it("display a home button", () => {
    render(
      <BrowserRouter>
        <NotFound />
      </BrowserRouter>
    );
    const allBeers = userEvent.click(
      screen.getByRole("link", { name: /back to all beers/i })
    );
  });
});

export default NotFound;
