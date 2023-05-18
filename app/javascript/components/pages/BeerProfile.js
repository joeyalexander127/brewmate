import React from "react";
import Charts from "../components/Charts";

const BeerProfile = ({ chart, current_user, readChart, suggested }) => {
  return (
    <>
      <h2>Your Profile</h2>
      <div className="new-user-info">
        <div className="new-user-text-block">
          <h5 className="new-user-subheading">Your Average ABV</h5>
          <p>{suggested?.abv.toFixed(2)}</p>
        </div>
        <div className="new-user-text-block">
          <h5 className="new-user-subheading">Your Average IBU</h5>
          <p>{suggested?.ibu}</p>
        </div>
      </div>
      {chart.length > 1 && (
        <Charts
          chart={chart}
          current_user={current_user}
          readChart={readChart}
        />
      )}
    </>
  );
};

export default BeerProfile;
