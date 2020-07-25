import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import './Header.scss';

function Header() {
  return (
    <div className="Header">
      <Navbar expand="lg">
        <Navbar.Brand href="#home">Nutanix</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/game">Play</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}

export default Header;
