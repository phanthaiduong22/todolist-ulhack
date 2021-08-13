import React, { Component } from "react";
import { Accordion, Col, Container, Row } from "react-bootstrap";
import Task from "../Task/Task";
import TaskTable from "../TaskTable/TaskTable"

class ToggleList extends Component {
  constructor(props) {
	super(props)
  } 

  render() {
	console.log(this.props)
    return (
      <>
        <Accordion>
          <Accordion.Item eventKey="0">
            <Accordion.Header>Recently Assigned</Accordion.Header>
            <Accordion.Body>
              {this.props.tasks.map((task) => {
                return <Task task={task} />;
              })}
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </>
    );
  }
}

export default ToggleList;


