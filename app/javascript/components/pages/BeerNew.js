import React, { useState } from "react";
import { useNavigate, useParams, } from "react-router-dom";
import { Card, Form, FormGroup, Input, Label} from "reactstrap";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

const BeerNew = ({createBeer, current_user}) => {
  const navigate = useNavigate()

  const [newBeer, setNewBeer] = useState({
    beer_name: "",
    brewery_name: "",
    style: "Lager",
    abv: "",
    ibu: "",
    image: "https://images.unsplash.com/photo-1618183479302-1e0aa382c36b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fGJlZXJ8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60",
    user_id: current_user?.id
  })

  const handleChange = (e) => {
    setNewBeer({...newBeer, [e.target.name]: e.target.value})
  }

  const onSubmit = () => {
    createBeer(newBeer)
    navigate("/mybeers")
  }


  return (
    <div className="create-form">
    <h1>Add a beer</h1>
    <Form>
    <FormGroup floating>
      <Input
        id="exampleBeer_Name"
        name="beer_name"
        placeholder="Beer Name"
        type="text"
        onChange={handleChange}
      />
      <Label for="exampleBeer_Name">
        Beer Name
      </Label>
    </FormGroup>
    <FormGroup floating>
      <Input
        id="exampleBrewery_Name"
        name="brewery_name"
        placeholder="Brewery Name"
        type="text"
        onChange={handleChange}
      />
      <Label for="exampleBrewery_Name">
        Brewery Name
      </Label>
    </FormGroup>
    <FormGroup>
    <Input
        id="exampleStyle"
        name="style"
        type="select"
        onChange={handleChange}>
        <option>
          Lager
        </option>
        <option>
          Pale Ale
        </option>
        <option>
          Pilsner
        </option>
        <option>
          Ale
        </option>
        <option>
          Stout
        </option>
        <option>
          Porter
        </option>
        <option>
          IPA
        </option>
        <option>
          Amber Ale
        </option>
        <option>
          Red Ale
        </option>
        <option>
          Brown Ale
        </option>
      </Input>
    </FormGroup>
    <FormGroup floating>
      <Input
        id="exampleABV"
        name="abv"
        placeholder="ABV"
        type="number"
        onChange={handleChange}
      />
      <Label for="exampleABV">
        ABV
      </Label>
    </FormGroup>
    <FormGroup floating>
      <Input
        id="exampleIBU"
        name="ibu"
        placeholder="IBU"
        type="number"
        onChange={handleChange}
      />
      <Label for="exampleIBU">
        IBU
      </Label>
    </FormGroup>
    <FormGroup floating>
      <Input
        id="exampleImage"
        name="image"
        placeholder="Image"
        type="text"
        value={newBeer.image}
        onChange={handleChange}
      />
      <Label for="exampleIBU">
        Image
      </Label>
    </FormGroup>
    <div className="create-btn">
      <Stack spacing={2} direction="row">
    <Button variant="contained"onClick={onSubmit}>Create</Button>
    <Button variant="contained"onClick={()=>{navigate(-1)}}>Cancel</Button>
      </Stack>
    </div>
  </Form>
  </div>
  )
};

export default BeerNew;
