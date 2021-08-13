import React, { Component } from "react";
import { Accordion, Col, Container, Row } from "react-bootstrap";
import Task from "../Task/Task";

class ToggleList extends Component {
  constructor(props) {
	super(props)
  } 

  render() {
	console.log(`user: ${this.props.username}`)
    return (
      <>
	  	<Container>
			<Row>
			{/* <Col></Col> */}
			<Col>
				<Accordion>
				<Accordion.Item eventKey="0">
					<Accordion.Header>Recently Assigned</Accordion.Header>
					<Accordion.Body>
					{this.props.tasks.map((task) => {
						return <Task username={this.props.username} task={task} />;
					})}
					</Accordion.Body>
				</Accordion.Item>
				</Accordion>
			</Col>
			{/* <Col></Col> */}
		</Row></Container>
      </>
    );
  }
}

export default ToggleList;


