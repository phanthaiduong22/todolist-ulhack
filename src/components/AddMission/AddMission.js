import React, { Component } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import callAPI from "../../utils/apiCaller";

import "react-datepicker/dist/react-datepicker.css";

class AddMission extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      mission_name: "",
    };
  }
  componentDidMount = () => {
    const username = localStorage.getItem("username");
    this.setState({ username });
  };
  missionNameOnChange = (e) => {
    this.setState({ mission_name: e.target.value });
  };
  onSubmit = () => {
    let { username, mission_name } = this.state;
    callAPI(`/missions/${username}`, "POST", {
      username,
      mission_name,
    })
      .then((response) => {
        this.handleClose();
        window.location.reload();
      })
      .catch((e) => {
        console.log(e);
      });
  };
  handleClose = () => {
    this.setState({ showModal: false });
  };
  handleShow = () => {
    this.setState({ showModal: true });
  };

  render() {
    return (
      <>
        <Button variant="primary" onClick={this.handleShow}>
          <FontAwesomeIcon icon={faPlus} /> {""}
          Add mission
        </Button>
        <Modal show={this.state.showModal} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add Mission</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb" controlId="exampleForm.ControlInput1">
                <Form.Label>Mission name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Your mission name"
                  onChange={this.missionNameOnChange}
                  value={this.state.mission_name}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={this.onSubmit}>
              Save
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

export default AddMission;
