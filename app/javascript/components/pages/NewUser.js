import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "reactstrap";

const NewUser = () => {
  const navigate = useNavigate();
  return (
    <>
      <section className="new-user-info">
        <h2>Welcome to BrewMate!</h2>
        <br />
        <h3>
          We wan't to make sure you have the best possible experience, so here
          are some tips!
        </h3>
        <></>

        <div className="new-user-text-block">
          <h5 className="new-user-subheading">
            First, a quick note about beer styles:
          </h5>
          <p>
            There are many different ways to make beer, and many more ways to
            describe a beer. Here at BrewMate, we have focused on categorizing
            beers into broad styles. This may mean that your favorite beer isn't
            listed the way you think it should be. We are updating our styles
            database to balance between easily suggesting beers to new
            BrewMates, and helping craft an accurate distinction between beers
          </p>
        </div>
        <div className="new-user-text-block">
          <h5 className="new-user-subheading">ABV:</h5>
          <p>
            The ABV of a beer is it's alcohol content per volume. Simply, the
            higher the ABV, the more total alchol is in the beer. Lighter beers
            typically have lower abv, where IPAs, Porters, and Stouts typically
            have more. There are always exceptions to this. At BrewMate, we
            strive to provide an ABV for each beer, so you can make responsible
            choices!
          </p>
        </div>
        <div className="new-user-text-block">
          <h5 className="new-user-subheading">IBU:</h5>
          <p>
            IBU stands for International Bitterness Units. It is actually
            measuring the amount of a specific chemical that is released from
            hops during the brewing process, called isohumulone (don't worry,
            that won't be on the test). The higher this number, the more bitter
            a beer will taste. Important to note: while IBU measures the level
            of bitterness in a beer, the perceived bitterness can absolutley
            change based on a series of factors such as flavors, sugar content,
            brewing process and more.
          </p>
        </div>
      </section>
      <section className="new-user-info">
        <div className="new-user-text-block">
          <h5 className="new-user-subheading">How BrewMate Works</h5>
          <p>
            Once you create an account with BrewMate, you will see the
            functionality to like a beer. After your first like, you will be
            able to go to the 'Beer Suggestions Page' in your user menu. This
            page will suggest new beers for you to try using three categories:
          </p>
          <ul>
            <li>
              Style: We will reccomend beers that are the same style as beers
              you have liked in the past.
            </li>
            <li>
              ABV: We will reccomend beers that are of a similar ABV of beers
              you have liked in the past. Like strong beers, great, we'll find
              you more!
            </li>
            <li>
              IBU: We will reccomend beers that have a similar IBU as beers you
              have liked in the past
            </li>
          </ul>
        </div>
        <div className="new-user-text-block">
          <h5 className="new-user-subheading">The BrewMate Database</h5>
          <p>
            All of the beers that are located in the BrewMate Database are at
            your fingertips! You can view all the beers in the database, and you
            can also use the search bar if you wish to look for a specific beer.
          </p>
        </div>
        <div className="new-user-text-block">
          <h5 className="new-user-subheading">Modifying the Database</h5>
          <p>
            If you try a beer that you don't find in our database, you can add
            it to our database, as long as you have an account. Keep in mind
            that any beer you add will be visible to ALL users, so please make
            sure that your data is accurate. Just like only you can prevent
            forest fires, only you can edit the data on a beer that you have
            uploaded.
          </p>
        </div>
      </section>
      <section className="new-user-info">
        <h2 className="new-user-subheading">Ready to get Started?</h2>
        <div className="new-user-text-block">
          <p>
            Head over to the beer database and see if there are any beers you
            have tried before. Hit the like button on any that you enjoyed, then
            head over to the Beer Suggestions page to start trying new brews!
          </p>
        </div>
        <Button onClick={() => navigate(`/beerindex/`)}>
          I'm Ready To View Beers!
        </Button>
      </section>
    </>
  );
};

export default NewUser;
