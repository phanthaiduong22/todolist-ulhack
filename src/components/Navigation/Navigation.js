import React, { Component } from "react";
import { Navbar, Nav, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

class Navigation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogIn: false,
    };
  }
  componentDidMount = () => {
    const username = localStorage.getItem("username");
    if (username !== null) this.setState({ isLogIn: true });
  };
  handleLogoutClick = () => {
    localStorage.removeItem("username");
    window.location.reload();
  };
  render() {
    let LogOut = null;
    if (this.state.isLogIn) {
      LogOut = <Button onClick={this.handleLogoutClick}>Logout</Button>;
    }

    let NavBar = (
      <>
        <LinkContainer to="/login">
          <Nav.Link>Login</Nav.Link>
        </LinkContainer>
        <LinkContainer to="/register">
          <Nav.Link>Register</Nav.Link>
        </LinkContainer>
      </>
    );
    if (this.state.isLogIn) {
      NavBar = (
        <>
          <LinkContainer to="/home">
            <Nav.Link>Home</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/reward">
            <Nav.Link>Reward</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/todoist">
            <Nav.Link>Todolist</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/mymission">
            <Nav.Link>My mission and vision</Nav.Link>
          </LinkContainer>
        </>
      );
    }
    return (
      <Navbar bg="light" expand="lg">
        <LinkContainer to="/">
          <Navbar.Brand>ZGoalizt</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">{NavBar}</Nav>
        </Navbar.Collapse>
        {LogOut}
      </Navbar>
    );
  }
}

export default Navigation;
