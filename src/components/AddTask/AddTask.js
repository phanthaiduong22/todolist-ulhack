import React, { Component } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import DatePicker from "react-datepicker";
import callAPI from "../../utils/apiCaller";

import "react-datepicker/dist/react-datepicker.css";

class AddTaskButton extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      task_name: "",
      is_importance: false,
      due_date: new Date(),
      showModal: false,
    };
  }
  componentDidMount = () => {
    const username = localStorage.getItem("username");
    this.setState({ username });
    console.log(username);
    if (username !== null) {
    }
  };
  taskNameOnChange = (e) => {
    this.setState({ task_name: e.target.value });
  };
  checkBoxOnClick = (e) => {
    this.setState({ is_importance: e.target.checked });
  };
  setDate = (date) => {
    this.setState({ due_date: date });
  };
  onSubmit = () => {
    let { username, task_name, is_importance, due_date } = this.state;
    callAPI("/tasks", "POST", {
      username,
      task_name,
      is_importance,
      due_date,
    })
      .then((response) => {
        // this.setState({ redirect: true });
        // console.log("login success");
        this.handleClose();
      })
      .catch((e) => {
        console.log(e);
      });
  };
  handleClose = () => {
    this.setState({ showModal: false });
  };
  handleShow = () => {
    console.log("hello");
    this.setState({ showModal: true });
  };

  render() {
    return (
      <>
        <Button variant="primary" onClick={this.handleShow}>
          <FontAwesomeIcon icon={faPlus} /> {""}
          Add Task
        </Button>
        <Modal show={this.state.showModal} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add Task</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb" controlId="exampleForm.ControlInput1">
                <Form.Label>Task name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Read book"
                  onChange={this.taskNameOnChange}
                  value={this.state.task_name}
                />
              </Form.Group>
              <Form.Group className="mb-3 mt-3" controlId="formBasicCheckbox">
                <Form.Check
                  type="checkbox"
                  label="Importance"
                  onChange={this.checkBoxOnClick}
                  checked={this.state.checkBoxChecked}
                />
              </Form.Group>
              <DatePicker
                selected={this.state.due_date}
                onChange={(date) => this.setDate(date)}
              />
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

export default AddTaskButton;
