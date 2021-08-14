import React, { Component } from "react";
import { Button, Modal, Form } from "react-bootstrap";
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
      importance_sum: 0,
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
    let count = this.state.importance_sum;
    if (e.target.checked) {
      this.setState({ importance_sum: count + 1 });
    } else {
      this.setState({ importance_sum: count - 1 });
    }
  };

  setDate = (date) => {
    this.setState({ due_date: date });
  };

  onSubmit = () => {
    let {
      username,
      task_name,
      importance_sum,
      is_importance,
      due_date,
      section_id,
    } = this.state;
    if (importance_sum > 6) {
      is_importance = true;
    }
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
                  <option value={-1} key={-1}>
                    Choose section
                  </option>
                  {sections.map((section) => {
                    return (
                      <option
                        value={section.section_id}
                        key={section.section_id}
                      >
                        {section.section_name}
                      </option>
                    );
                  })}
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3 mt-3" controlId="formBasicCheckbox">
                <hr />
                <Form.Label> Important survey </Form.Label>
                <Form.Check
                  type="checkbox"
                  label="This task helps to achieve your big goal."
                  onChange={this.checkBoxOnClick}
                  id="1"
                />
                <Form.Check
                  type="checkbox"
                  label=" This task should be done as perfectly as possible."
                  onChange={this.checkBoxOnClick}
                  id="2"
                />

                <Form.Check
                  type="checkbox"
                  label=" This task is of great value."
                  onChange={this.checkBoxOnClick}
                  id="3"
                />

                <Form.Check
                  type="checkbox"
                  label="This task might take a long time due to careful research."
                  onChange={this.checkBoxOnClick}
                  id="4"
                />

                <Form.Check
                  type="checkbox"
                  label="This task reflects your ability to other people."
                  onChange={this.checkBoxOnClick}
                  id="5"
                />

                <Form.Check
                  type="checkbox"
                  label="This task must be handed on time."
                  onChange={this.checkBoxOnClick}
                  id="6"
                />

                <Form.Check
                  type="checkbox"
                  label="You care about this task more than other tasks."
                  onChange={this.checkBoxOnClick}
                  id="7"
                />

                <Form.Check
                  type="checkbox"
                  label="You can get nervous if this task is out of your control."
                  onChange={this.checkBoxOnClick}
                  id="8"
                />

                <Form.Check
                  type="checkbox"
                  label="You have only one chance to do this task properly."
                  onChange={this.checkBoxOnClick}
                  id="9"
                />

                <Form.Check
                  type="checkbox"
                  label="If you fail in this task, you can redo but it money-consuming."
                  onChange={this.checkBoxOnClick}
                  id="10"
                />
              </Form.Group>
              <hr />
              <Form.Label> Due Date </Form.Label>
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
