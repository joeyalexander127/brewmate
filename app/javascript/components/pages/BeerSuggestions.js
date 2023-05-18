import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import {
  ButtonGroup,
  Button,
  Card,
  CardBody,
  CardText,
  CardTitle,
  CardSubtitle,
} from "reactstrap";
import IndexCard from "../components/IndexCard";

const BeerSuggestions = ({
  current_user,
  suggested,
  likes,
  suggestedBeer,
  deleteBeer,
  deleteLike,
  navigate,
  logged_in,
  likeBeer,
  readLikes,
}) => {
  let myIBUSuggestions = suggested?.ibu_suggested;
  let myABVSuggestions = suggested?.abv_suggested;
  let styleSuggestions = suggested?.style_suggested;
  useEffect(() => {
    readLikes();
    suggestedBeer(current_user.id);
  }, []);
  return (
    <>
      {likes.length === 0 && (
        <h2>
          Once you have liked a few beers, we can start to give you some
          suggestions!
          <NavLink to="/beerindex">Check out some beers</NavLink>
        </h2>
      )}
      {myIBUSuggestions && (
        <div className="index-content">
          {myIBUSuggestions?.length > 0 && (
            <>
              <h2>Your Beer Suggestions By IBU</h2>
              <h4>--Closest to your liked beers IBU from left to right--</h4>
            </>
          )}
          {myIBUSuggestions?.length === 0 && (
            <h2>
              You need to like a beer before we are able to give suggestions{" "}
              <NavLink to="/beerindex">Check out some beers</NavLink>
            </h2>
          )}

          <div className="index-cards">
            {myIBUSuggestions?.map((beer, index) => {
              return (
                <IndexCard
                  beer={beer}
                  key={index}
                  navigate={navigate}
                  current_user={current_user}
                  logged_in={logged_in}
                  deleteBeer={deleteBeer}
                  likeBeer={likeBeer}
                  deleteLike={deleteLike}
                  likes={likes}
                />
              );
            })}
          </div>
        </div>
      )}
      {/*++++++++ ABV SUGGESTION SECTION*/}
      {myABVSuggestions && (
        <div className="index-content">
          {myABVSuggestions?.length > 0 && (
            <>
              <h2>Your Beer Suggestions By ABV</h2>
              <h4>--Closest to your liked beers ABV from left to right--</h4>
            </>
          )}
          {myABVSuggestions?.length === 0 && (
            <h2>
              You need to like a beer before we are able to give suggestions{" "}
              <NavLink to="/beerindex">Check out some beers</NavLink>
            </h2>
          )}

          <div className="index-cards">
            {myABVSuggestions?.map((beer, index) => {
              return (
                <IndexCard
                  beer={beer}
                  key={index}
                  navigate={navigate}
                  current_user={current_user}
                  logged_in={logged_in}
                  deleteBeer={deleteBeer}
                  likeBeer={likeBeer}
                  deleteLike={deleteLike}
                  likes={likes}
                />
              );
            })}
          </div>
        </div>
      )}

      {/*++++++++ STYLE SUGGESTION SECTION*/}
      {styleSuggestions && (
        <div className="index-content">
          {styleSuggestions?.length > 0 && (
            <>
              <h2>Your Beer Suggestions By styles</h2>
              <h4>--Beers of the same styles you already like--</h4>
            </>
          )}
          {styleSuggestions?.length === 0 && (
            <h2>
              You need to like a beer before we are able to give suggestions{" "}
              <NavLink to="/beerindex">Check out some beers</NavLink>
            </h2>
          )}

          <div className="index-cards">
            {styleSuggestions?.map((beer, index) => {
              return (
                <IndexCard
                  beer={beer}
                  key={index}
                  navigate={navigate}
                  current_user={current_user}
                  logged_in={logged_in}
                  deleteBeer={deleteBeer}
                  likeBeer={likeBeer}
                  deleteLike={deleteLike}
                  likes={likes}
                />
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};

export default BeerSuggestions;
