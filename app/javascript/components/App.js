import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import BeerIndex from "./pages/BeerIndex";
import BeerEdit from "./pages/BeerEdit";
import BeerNew from "./pages/BeerNew";
import BeerSuggestions from "./pages/BeerSuggestions";
import BeerProfile from "./pages/BeerProfile";
import MyBeers from "./pages/MyBeers";
import Header from "./components/Header";
import Footer from "./components/Footer";
import MyLikedBeers from "./pages/MyLikedBeers";
import NotFound from "./pages/NotFound";
import NewUser from "./pages/NewUser";

const App = (props) => {
  const [beers, setBeers] = useState([]);
  const [likes, setLikes] = useState([]);
  const [suggested, setSuggested] = useState();
  const [chart, setChart] = useState([]);

  const readBeer = () => {
    fetch("/beers")
      .then((response) => response.json())
      .then((payload) => setBeers(payload))
      .catch((error) => console.log(error));
  };

  const readLikes = () => {
    fetch("/likes")
      .then((response) => response.json())
      .then((payload) => setLikes(payload))
      .catch((error) => console.log(error));
  };

  const createBeer = (beer) => {
    fetch("/beers", {
      body: JSON.stringify(beer),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    })
      .then((response) => response.json())
      .then((payload) => readBeer())
      .catch((error) => console.log(beer.errors, error));
  };

  const editBeer = (beer, id) => {
    fetch(`/beers/${id}`, {
      body: JSON.stringify(beer),
      headers: {
        "Content-Type": "application/json",
      },
      method: "PATCH",
    })
      .then((response) => response.json())
      .then(() => readBeer())
      .catch((error) => console.log(beer.errors, error));
  };

  const deleteBeer = (id) => {
    fetch(`/beers/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "DELETE",
    })
      .then((response) => response.json())
      .then(() => readBeer())
      .catch((error) => console.log(error));
  };

  const likeBeer = (likedBeer) => {
    fetch("/likes", {
      body: JSON.stringify(likedBeer),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    })
      .then((response) => response.json())
      .then((payload) => readLikes())
      .catch((error) => console.log(likedBeer.errors));
  };

  const deleteLike = (id) => {
    fetch(`/likes/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "DELETE",
    })
      .then((response) => response.json())
      .then(() => readLikes())
      .catch((error) => console.log(error));
  };
  const suggestedBeer = (id) => {
    fetch(`/users/${id}/suggested_beers`)
      .then((response) => response.json())
      .then((payload) => setSuggested(payload))
      .catch((error) => console.log("SuggestedBeer Fetch:", error));
  };

  const readChart = (id) => {
    fetch(`/users/${id}/charts_data`)
      .then((response) => response.json())
      .then((payload) => setChart(payload))
      .catch((error) => console.log("Charts Fetch: ", error));
  };

  useEffect(() => {
    readBeer();
    readLikes();

    if (props?.current_user) {
      suggestedBeer(props.current_user.id);
      readChart(props.current_user.id);
    }
  }, []);

  return (
    <>
      <BrowserRouter>
        <Header {...props} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/beerindex"
            element={
              <BeerIndex
                beers={beers}
                current_user={props.current_user}
                logged_in={props.logged_in}
                deleteBeer={deleteBeer}
                likeBeer={likeBeer}
                deleteLike={deleteLike}
                likes={likes}
              />
            }
          />
          <Route
            path="/beeredit/:id"
            element={<BeerEdit beers={beers} editBeer={editBeer} />}
          />
          <Route
            path="/beernew"
            element={
              <BeerNew
                current_user={props.current_user}
                createBeer={createBeer}
              />
            }
          />

          <Route
            path="/beersuggestions"
            element={
              <BeerSuggestions
                current_user={props.current_user}
                suggested={suggested}
                likes={likes}
                suggestedBeer={suggestedBeer}
                logged_in={props.logged_in}
                likeBeer={likeBeer}
                deleteBeer={deleteBeer}
                deleteLike={deleteLike}
                readLikes={readLikes}
              />
            }
          />
          <Route
            path="/beerprofile"
            element={
              <BeerProfile
                chart={chart}
                current_user={props.current_user}
                readChart={readChart}
                suggested={suggested}
              />
            }
          />
          <Route
            path="/mybeers"
            element={
              <MyBeers
                current_user={props.current_user}
                suggested={suggested}
                likes={likes}
                suggestedBeer={suggestedBeer}
                logged_in={props.logged_in}
                likeBeer={likeBeer}
                deleteBeer={deleteBeer}
                deleteLike={deleteLike}
                readLikes={readLikes}
              />
            }
          />
          <Route
            path="/mylikedbeers"
            element={
              <MyLikedBeers
                current_user={props.current_user}
                suggested={suggested}
                likes={likes}
                suggestedBeer={suggestedBeer}
                logged_in={props.logged_in}
                likeBeer={likeBeer}
                deleteBeer={deleteBeer}
                deleteLike={deleteLike}
                readLikes={readLikes}
              />
            }
          />
          <Route path="/newuser" element={<NewUser />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
};

export default App;
