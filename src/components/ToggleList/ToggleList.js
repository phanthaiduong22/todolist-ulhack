import React, { Component } from "react";
import { Accordion, Container } from "react-bootstrap";
import Home from "../../pages/Home/Home";
import NewTask from "../NewTask/NewTask";
import Task from "../Task/Task";
// import { Navbar, Nav } from "react-bootstrap";
// import { LinkContainer } from "react-router-bootstrap";

class ToggleList extends Component {
  constructor(props) {
    super(props);
    this.state = {
		tasks: props.tasks
	}
  }

  render() {
    let { tasks } = this.state;
	console.log(tasks)
    return (
      <div>
        <Accordion>
          <Accordion.Item eventKey="0">
            <Accordion.Header>Recently Assigned</Accordion.Header>
            <Accordion.Body>
              {tasks.map((task) => {
                return <Task task={task} />;
              })}
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </div>
    );
  }
}
export default ToggleList;
