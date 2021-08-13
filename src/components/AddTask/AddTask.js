import React, { Component } from "react";
import { Button, Modal, Form, DropdownButton, Dropdown } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import DatePicker from "react-datepicker";
import callAPI from "../../utils/apiCaller";
import moment from "moment";
import "react-datepicker/dist/react-datepicker.css";

class AddTask extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      task_name: "",
      is_importance: false,
      due_date: new Date(),
      showModal: false,
      sections: [],
      section_id: -1,
    };
  }
  componentDidMount = () => {
    const username = localStorage.getItem("username");
    if (username != null) {
      this.setState({ username });

      callAPI(`/sections/${username}`, "GET", {
        username,
      })
        .then((response) => {
          this.setState({ sections: response.data.sections });
        })
        .catch((e) => {
          console.log(e);
        });
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
    let { username, task_name, is_importance, due_date, section_id } =
      this.state;
    const dateTime = moment(due_date, "DD/MM/YYYY").format("YYYY-MM-DD");
    callAPI("/tasks", "POST", {
      username,
      task_name,
      is_importance,
      due_date: dateTime,
      section_id,
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
  handleDropDownSelect = (e) => {
    this.setState({ section_id: Number(e.target.value) });
  };

  render() {
    let { sections } = this.state;
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
              <Form.Group
                className="mb mt-2"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Section Name</Form.Label>
                <Form.Select
                  aria-label="Default select example"
                  onClick={this.handleDropDownSelect}
                >
                  <option value={-1}>Choose section</option>
                  {sections.map((section) => {
                    return (
                      <option value={section.section_id}>
                        {section.section_name}
                      </option>
                    );
                  })}
                </Form.Select>
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

export default AddTask;
