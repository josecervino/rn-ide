import React from "react";
import { Navbar, NavItem, Nav } from "react-bootstrap";

class Tab extends React.Component {
  render() {
    return (
      <Navbar>
        <Nav>
          <NavItem eventKey={1} href="#">
            Tab1
          </NavItem>
          <NavItem eventKey={2} href="#">
            Tab2
          </NavItem>
          <NavItem eventKey={1} href="#">
            Tab3
          </NavItem>
          <NavItem eventKey={1} href="#">
            Tab4
          </NavItem>
          <NavItem eventKey={1} href="#">
            Tab5
          </NavItem>
        </Nav>
      </Navbar>
    );
  }
}

export default Tab;
