import React, { useState } from "react";
import IndexCard from "../components/IndexCard";
import { useNavigate } from "react-router-dom";

const MyBeers = ({
  beers,
  beer,
  current_user,
  logged_in,
  likes,
  deleteBeer,
  likeBeer,
  deleteLike,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  let selectedLike = likes?.find(
    (like) => beer?.id === like?.beer_id && current_user?.id === like?.user_id
  );
  const isLiked = () => {
    return (
      likes?.filter(
        (like) => like.user_id === current_user.id && like.beer_id === beer?.id
      ).length > 0
    );
  };
  let userBeers = beers?.filter((beer) => current_user.id === beer.user_id);
  let navigate = useNavigate();

  const onDeleteSubmit = () => {
    deleteBeer(beer.id);
    // TODO: Handle this behavior better
    navigate("/beerindex");
  };
  const onLikeSubmit = () => {
    let likedBeer = {
      beer_id: beer.id,
      user_id: current_user.id,
    };
    likeBeer(likedBeer);
    // navigate(0);
  };
  const onRemoveLikeSubmit = () => {
    deleteLike(selectedLike.id);
    // navigate(0);
  };

  return (
    <>
      <div className="index-content">
        <h2>Your Uploaded Brews</h2>
        <div className="index-cards">
          {userBeers?.map((beer, index) => {
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
    </>
  );
};

export default MyBeers;
