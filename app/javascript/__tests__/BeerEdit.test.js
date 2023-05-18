import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import BeerEdit from "../components/pages/BeerEdit";
import { BrowserRouter, MemoryRouter, Routes, Route } from "react-router-dom";
import beers from "../MockBeer";

describe("<BeerEdit />", () => {
  beforeEach(() => {
    render(
      <MemoryRouter initialEntries={["/beeredit/1"]}>
        <Routes>
          <Route path="/beeredit/:id" element={<BeerEdit beers={beers} />} />
        </Routes>
      </MemoryRouter>
    );
  });
  it("renders an edit page without crashing", () => {
    const pageTitle = screen.getByText("Update Beer Info");
    expect(pageTitle).toBeInTheDocument();
  });
  it("has fillable forms for updating beer info", () => {
    const formname = screen.getByText(/beer name/i);
    expect(formname.getAttribute("for")).toEqual("beer_name");

    const formBrewery = screen.getByText(/Brewery/i);
    expect(formBrewery.getAttribute("for")).toEqual("brewery_name");

    const formABV = screen.getByText(/ABV/i);
    expect(formABV.getAttribute("for")).toEqual("abv");

    const formIBU = screen.getByText(/ibu/i);
    expect(formIBU.getAttribute("for")).toEqual("ibu");

    const formImage = screen.getByText(/Image/i);
    expect(formImage.getAttribute("for")).toEqual("image");
  });
  it("displays a button to submit the form and cancel", () => {
    expect(
      screen.getByRole("button", {
        name: /edit/i,
      })
    ).toBeInTheDocument;
    expect(screen.getByRole("button", { name: /cancel/i })).toBeInTheDocument;
  });
});
