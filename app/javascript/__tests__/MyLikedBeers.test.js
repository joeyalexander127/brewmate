import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import MyLikedBeers from "../components/pages/MyLikedBeers";

describe("<MyLikedBeers>", () => {
  beforeEach(() => {
    const current_user = {
      email: "test@testing.com",
      password: "testing123",
      id: 1,
    };

    const likes = [
      {
        user_id: 1,
        beer_id: 1,
        beer: {
          user_id: 1,
          beer_name: "Test Beer",
          brewery_name: "Aaron Brewing",
          style: "Test Style",
          abv: 10.0,
          ibu: 50,
          image:
            "https://images.unsplash.com/photo-1535958636474-b021ee887b13?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8YmVlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
          id: 1,
        },
      },
      {
        user_id: 1,
        beer_id: 2,
        beer: {
          user_id: 1,
          beer_name: "Test Beer Dos",
          brewery_name: "Xavier Brewing",
          style: "Test Style Differente",
          abv: 5.0,
          ibu: 10,
          image:
            "https://images.unsplash.com/photo-1571613316887-6f8d5cbf7ef7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8YmVlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
          id: 2,
        },
      },
    ];
    render(
      <BrowserRouter>
        <MyLikedBeers current_user={current_user} likes={likes} />
      </BrowserRouter>
    );
  });
  it("renders without crashing", () => {});
  it("properly displays header", () => {
    expect("Your Liked Brews").toBeInTheDocument;
  });

  it("displays a list of beers", () => {
    expect("Test Beer").toBeInTheDocument;
    expect("Test Beer Dos").toBeInTheDocument;
  });

  it("displays a button for each beer to see more info", () => {
    expect(
      screen.getAllByRole("button", { name: /show more/i }).length
    ).toEqual(2);
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
