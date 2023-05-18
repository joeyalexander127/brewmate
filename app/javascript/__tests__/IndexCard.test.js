import React from "react";
import IndexCard from "../components/components/IndexCard";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

describe("<IndexCard.js>", () => {
  const beer = {
    id: 1,
    user_id: 1,
    beer_name: "Test Beer",
    brewery_name: "Aaron Brewing",
    style: "Test Style",
    abv: 10.0,
    ibu: 50,
    image:
      "https://images.unsplash.com/photo-1535958636474-b021ee887b13?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8YmVlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
  };

  const current_user = {
    email: "test@testing.com",
    password: "testing123",
    id: 1,
  };

  const likes = [
    {
      user_id: 1,
      beer_id: 1,
    },
  ];
  let deleteBeer = jest.fn();
  let navigate = jest.fn();
  let likeBeer = jest.fn();
  let deleteLike = jest.fn();

  // prepares render conditions based on boolean values
  const renderConditions = (isLoggedIn, isMyBeer, isLiked) => {
    if (isLoggedIn && isMyBeer && isLiked) {
      render(
        <BrowserRouter>
          <IndexCard
            beer={beer}
            current_user={current_user}
            logged_in={isLoggedIn}
            likes={likes}
            selectedLike={1}
            deleteBeer={deleteBeer}
            navigate={navigate}
            deleteLike={deleteLike}
          />
        </BrowserRouter>
      );
    } else if (isLoggedIn && isMyBeer && !isLiked) {
      render(
        <BrowserRouter>
          <IndexCard
            beer={beer}
            current_user={current_user}
            logged_in={true}
            likes={[]}
            likeBeer={likeBeer}
          />
        </BrowserRouter>
      );
    }
  };

  it("renders the component without crashing", () => {
    renderConditions(true, true, true);
  });

  it("displays the information of a beer", () => {
    renderConditions(true, true, true);
    expect(beer.beer_name).toBeInTheDocument;
    expect(beer.beer_style).toBeInTheDocument;
    expect(beer.brewery_name).toBeInTheDocument;
  });
  it("displays a button to edit", () => {
    renderConditions(true, true, true);
    expect(screen.getByRole("button", { name: /edit/i })).toBeInTheDocument;
  });
  it("if user has created the beer shows a navigation and delete button", () => {
    renderConditions(true, true, true);
    expect(screen.getByRole("button", { name: /delete/i })).toBeInTheDocument;
  });
  it("calls the deleteBeer function when the delete button is clicked", () => {
    renderConditions(true, true, true);
    fireEvent.click(screen.getByRole("button", { name: /delete/i }));
    expect(deleteBeer.mock.calls).toHaveLength(1);
  });
  it("calls the likeBeer function when the like button is clicked", () => {
    renderConditions(true, true, false);
    fireEvent.click(screen.getByRole("button", { name: /like/i }));
    expect(likeBeer.mock.calls).toHaveLength(1);
  });
  it("calls the deleteLike function when the remove like button is clicked", () => {
    renderConditions(true, true, true);
    fireEvent.click(screen.getByRole("button", { name: /unlike/i }));
    expect(deleteLike.mock.calls).toHaveLength(1);
  });
  it("navigates to the edit page when the edit button is clicked", () => {
    renderConditions(true, true, true);
    fireEvent.click(screen.getByRole("button", { name: /edit/i }));
    expect(navigate.mock.lastCall).toEqual(["/beeredit/1"]);
  });
});
