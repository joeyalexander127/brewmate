import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Card, Form, FormGroup, Input, Label } from "reactstrap";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

const BeerEdit = ({ editBeer, beers }) => {
  const { id } = useParams();
  const [updatedBeer, setUpdatedBeer] = useState();
  const navigate = useNavigate();
  useEffect(() => {
    if (beers.length > 0) {
      let selectedBeer = beers?.find((beer) => beer.id === +id);
      setUpdatedBeer({
        id: selectedBeer?.id,
        beer_name: selectedBeer?.beer_name,
        brewery_name: selectedBeer?.brewery_name,
        abv: selectedBeer?.abv,
        ibu: selectedBeer?.ibu,
        style: selectedBeer?.style,
        image: selectedBeer?.image,
        user_id: selectedBeer?.user_id,
      });
    }
  }, [beers]);

  const handleChange = (e) => {
    setUpdatedBeer({ ...updatedBeer, [e.target.name]: e.target.value });
  };

  const onSubmit = () => {
    editBeer(updatedBeer, id);
    navigate("/mybeers");
  };

  let styles = [];
  beers?.map((beer) => {
    if (!styles.includes(beer.style)) {
      styles.push(beer.style);
    }
  });

  if (updatedBeer && styles) {
    return (
      <>
        <div className="create-form">
          <h1>Update Beer Info</h1>
          <Form>
            <FormGroup floating>
              <Input
                id="beer_name"
                name="beer_name"
                type="text"
                value={updatedBeer?.beer_name}
                onChange={handleChange}
              />
              <Label for="beer_name">Beer Name</Label>
            </FormGroup>
            <FormGroup floating>
              <Input
                id="brewery_name"
                name="brewery_name"
                placeholder="Brewery Name"
                type="text"
                onChange={handleChange}
                value={updatedBeer?.brewery_name}
              />
              <Label for="brewery_name">Brewery Name</Label>
            </FormGroup>
            <FormGroup>
              {styles && (
                <Input
                  id="style"
                  name="style"
                  type="select"
                  onChange={handleChange}
                  value={updatedBeer?.style}
                >
                  {styles?.map((style, index) => {
                    return <option key={index}>{style}</option>;
                  })}
                </Input>
              )}
            </FormGroup>
            <FormGroup floating>
              <Input
                id="abv"
                name="abv"
                placeholder="ABV"
                type="number"
                onChange={handleChange}
                value={updatedBeer?.abv}
              />
              <Label for="abv">ABV</Label>
            </FormGroup>
            <FormGroup floating>
              <Input
                id="ibu"
                name="ibu"
                placeholder="IBU"
                type="number"
                onChange={handleChange}
                value={updatedBeer?.ibu}
              />
              <Label for="ibu">IBU</Label>
            </FormGroup>
            <FormGroup floating>
              <Input
                id="image"
                name="image"
                placeholder="Image"
                type="text"
                onChange={handleChange}
                value={updatedBeer?.image}
              />
              <Label for="image">Image</Label>
            </FormGroup>
            <div className="create-btn">
            <Stack spacing={2} direction="row">
              <Button variant="contained"onClick={onSubmit}>Edit</Button>
              <Button variant="contained"
                onClick={() => {
                  navigate(-1);
                }}
              >
                Cancel
              </Button>
              </Stack>
            </div>
          </Form>
        </div>
      </>
    );
  }
};

export default BeerEdit;
