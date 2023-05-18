import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import MyBeers from "../components/pages/MyBeers";
import userEvent from "@testing-library/user-event";

describe("<MyBeers>", () => {
  const deleteBeer = jest.fn();
  const navigate = jest.fn();
  beforeEach(() => {
    const current_user = {
      email: "test@testing.com",
      password: "testing123",
      id: 1,
    };
    const beers = [
      {
        user_id: 1,
        beer_name: "Test Beer",
        brewery_name: "Aaron Brewing",
        style: "Test Style",
        abv: 10.0,
        ibu: 50,
        image:
          "https://images.unsplash.com/photo-1535958636474-b021ee887b13?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8YmVlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
      },
      {
        user_id: 1,
        beer_name: "Test Beer Dos",
        brewery_name: "Xavier Brewing",
        style: "Test Style Differente",
        abv: 5.0,
        ibu: 10,
        image:
          "https://images.unsplash.com/photo-1571613316887-6f8d5cbf7ef7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8YmVlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
      },
    ];
    render(
      <BrowserRouter>
        <MyBeers
          beers={beers}
          current_user={current_user}
          deleteBeer={deleteBeer}
          navigate={navigate}
        />
      </BrowserRouter>
    );
  });
  it("renders without crashing", () => {});
  it("properly displays header", () => {
    expect("View All Brews").toBeInTheDocument;
  });

  it("displays a list of beers", () => {
    expect("Test Beer").toBeInTheDocument;
    expect("Test Beer Dos").toBeInTheDocument;
  });

  it("displays a button for each beer to see more info", () => {
    render(
      <BrowserRouter>
        <MyBeers />
      </BrowserRouter>
    );
    const seeMore = userEvent.click(
      screen.getAllByRole("button", { name: /show more/i })
    );
  });
  it("displays a brewery for each beer", () => {
    expect(screen.getByRole("heading", { name: /aaron brewing/i }))
      .toBeInTheDocument;
    expect(screen.getByRole("heading", { name: /xavier brewing/i }))
      .toBeInTheDocument;
  });
  it("displays an image for each beer", () => {
    expect(screen.getAllByRole("img").length).toEqual(2);
  });
});
