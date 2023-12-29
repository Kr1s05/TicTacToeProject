import { Navbar, Container, Nav, Dropdown } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import Icon from "../assets/icon.svg?react";
import UserIcon from "../assets/person-fill.svg?react";
import "../style/navBarStyle.css";
function Navigation() {
  return (
    <Navbar expand="lg" fixed="top">
      <Container fluid>
        <Navbar.Brand>
          <Icon />
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="fs-5">
          <Nav className="text-center mx-auto ">
            <Nav.Link as={NavLink} to={"/"}>
              Home
            </Nav.Link>
            <Nav.Link>Game Rooms</Nav.Link>
            <Nav.Link as={NavLink} to={"/info"}>
              Info
            </Nav.Link>
          </Nav>
          <Dropdown className="float-end" align="end">
            <Dropdown.Toggle
              id="account-dropdown"
              as={UserIcon}
            ></Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Header>Profile</Dropdown.Header>
              <Dropdown.Divider />
              <Dropdown.Item as={NavLink} to={"/login"}>
                Login
              </Dropdown.Item>
              <Dropdown.Item as={NavLink} to={"/register"}>
                Register
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation;
