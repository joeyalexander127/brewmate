import React from 'react'
import { Nav, Navbar, NavbarBrand, NavbarText } from "reactstrap";

const Footer = () => {
  return (
    <footer>
      <Navbar fixed="bottom">
        <Nav className="me-auto" navbar></Nav>
        <NavbarText>&copy; LEARN Academy | The Four Horsemen | Alpha 2023</NavbarText>
      </Navbar>
    </footer>
  )
}

export default Footer