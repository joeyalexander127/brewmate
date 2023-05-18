import React, { useState } from "react";
import {
  Nav,
  NavItem,
  Dropdown,
  DropdownItem,
  DropdownToggle,
  DropdownMenu,
} from "reactstrap";
import { NavLink } from "react-router-dom";

const Header = ({
  logged_in,
  current_user,
  new_user_route,
  sign_in_route,
  sign_out_route,
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen(!dropdownOpen);

  return (
    <div className="drop-down">
      <Nav tabs>
        <NavItem>
          <NavLink className="nav-link" to="/">
            Brewmate
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink className="nav-link" to="/beerindex">
            All Beers
          </NavLink>
        </NavItem>
        {logged_in && (
          <>
            <Dropdown nav isOpen={dropdownOpen} toggle={toggle}>
              <DropdownToggle nav caret>
                {current_user.email}
              </DropdownToggle>
              <DropdownMenu>
                <NavLink className="nav-link" to="/beersuggestions">
                  <DropdownItem>Beer Suggestions</DropdownItem>
                </NavLink>
                <NavLink className="nav-link" to="/mybeers">
                  <DropdownItem>Your Beers</DropdownItem>
                </NavLink>
                <NavLink className="nav-link" to="/mylikedbeers">
                  <DropdownItem>Liked Beers</DropdownItem>
                </NavLink>
                <NavLink className="nav-link" to="/beernew">
                  <DropdownItem>Add Beer</DropdownItem>
                </NavLink>
                <NavLink className="nav-link" to="/beerprofile">
                  <DropdownItem>Profile</DropdownItem>
                </NavLink>

                <DropdownItem divider />
                <a className="nav-link" href={sign_out_route}>
                  <DropdownItem>Log out</DropdownItem>
                </a>
              </DropdownMenu>
            </Dropdown>
          </>
        )}
        {!logged_in && (
          <>
            <NavItem>
              <a className="nav-link" href={sign_in_route}>
                Log in
              </a>
            </NavItem>
            <NavItem>
              <a className="nav-link" href={new_user_route}>
                Create an account
              </a>
            </NavItem>
          </>
        )}
      </Nav>
    </div>
  );
};

export default Header;
