import React from "react";
import { render, screen } from "@testing-library/react";
import Home from "../components/pages/Home";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import logo from "../assets/brewmate-high-resolution-logo-color-on-transparent-background.png";
import aaron from "../assets/aaron.png";
import xavier from "../assets/xavier.png";
import joey from "../assets/joey.png";
import john from "../assets/john.png";

describe("<Home />", () => {
  it("renders without crashing", () => {
    render(
      <BrowserRouter>
        <Home
          logo={logo}
          aaron={aaron}
          xavier={xavier}
          joey={joey}
          john={john}
        />
      </BrowserRouter>
    );
    const text = screen.getByText(/welcome to brewmate/i);
    expect(text).toBeInTheDocument();
  });
});
