import React, { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  CardSubtitle,
  CardText,
  CardTitle,
  Button,
  Collapse,
  Badge,
} from "reactstrap";
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";
import IconButton from "@mui/material/IconButton";
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import Stack from "@mui/material/Stack";
import ExpandMoreTwoToneIcon from "@mui/icons-material/ExpandMoreTwoTone";
import GradeOutlinedIcon from "@mui/icons-material/GradeOutlined";
import GradeIcon from "@mui/icons-material/Grade";
import Tooltip from "@mui/material/Tooltip";

const IndexCard = ({
  beer,
  current_user,
  logged_in,
  likes,
  navigate,
  deleteBeer,
  likeBeer,
  deleteLike,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  // find the like (if any) assosciated with this beer and user
  let selectedLike = likes?.find(
    (like) => beer?.id === like?.beer_id && current_user?.id === like?.user_id
  );

  // we need to check if the array of likes contains an object that matches the signed in user and selected beer
  const isLiked = () => {
    return (
      likes?.filter(
        (like) => like.user_id === current_user.id && like.beer_id === beer?.id
      ).length > 0
    );
  };

  // passes the beer id up to the deleteBeer function when delete button is pressed
  const onDeleteSubmit = () => {
    deleteBeer(beer.id);
  };

  // passes beer id to the likeBeer function on button press
  const onLikeSubmit = () => {
    let likedBeer = {
      beer_id: beer.id,
      user_id: current_user.id,
    };
    likeBeer(likedBeer);
    // navigate(0);
  };

  // removes the like from the database
  const onRemoveLikeSubmit = () => {
    deleteLike(selectedLike.id);
    // navigate(0);
  };

  return (
    <>
      {beer && (
        <Card
          style={{
            width: "20vw",
          }}
          className="index-card"
        >
          <CardBody>
            <img
              alt={`A picture of ${beer?.beer_name}`}
              src={beer?.image}
              className="index-image"
            />
            <CardTitle tag="h5">{beer?.beer_name}</CardTitle>
            <CardSubtitle className="mb-2 text-muted" tag="h6">
              {beer?.brewery_name}
            </CardSubtitle>
            <CardText>{beer?.beer_style}</CardText>
            <Collapse isOpen={isOpen}>
              <CardText>
                <Badge>ABV: {beer.abv}</Badge>
                <Badge>IBU: {beer.ibu}</Badge>
                <Badge>Style: {beer.style}</Badge>
              </CardText>
            </Collapse>
          </CardBody>
          <div className="index-icons">

          <Tooltip title="Show More/Less" arrow>
          <IconButton aria-label="show more" onClick={toggle}>
            <ExpandMoreTwoToneIcon  />
            </IconButton>

            </Tooltip>
          </div>
          {logged_in && (
            <>
              <div className="index-icons">

                {isLiked() && (
                  <Tooltip title="Remove Like" arrow>
                    <IconButton
                      aria-label="unlike"
                      onClick={onRemoveLikeSubmit}
                    >
                      <GradeIcon />
                    </IconButton>

                  </Tooltip>
                )}
                {!isLiked() && (
                  <Tooltip title="Like This Beer!" arrow>
                    <IconButton aria-label="like" onClick={onLikeSubmit}>
                      <GradeOutlinedIcon />
                    </IconButton>
                  </Tooltip>
                )}
              </div>
            </>
          )}
          {current_user?.id === beer.user_id && (
            <>
              <div className="index-icons">

                <Stack direction="row" spacing={1}>
                  <Tooltip title="Edit Your Beer" arrow>
                    <IconButton
                      onClick={() => navigate(`/beeredit/${beer.id}`)}
                      aria-label="edit"
                    >
                      <EditTwoToneIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete Your Beer" arrow>
                    <IconButton onClick={onDeleteSubmit} aria-label="delete">
                      <DeleteTwoToneIcon />
                    </IconButton>
                  </Tooltip>

                </Stack>
              </div>
            </>
          )}
        </Card>
      )}
    </>
  );
};

export default IndexCard;
