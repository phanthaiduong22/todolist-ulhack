import React, { Component } from "react";
import { Accordion, Container } from "react-bootstrap";
import NewTask from "../NewTask/NewTask"
// import { Navbar, Nav } from "react-bootstrap";
// import { LinkContainer } from "react-router-bootstrap";

class ToggleList extends Component {
	constructor() {
		super();
		this.state = { 
			task: []
		};
	  }

	render(){
		return (
			<div>
				<Accordion>
				<Accordion.Item eventKey="0">
					<Accordion.Header>Recently Assigned</Accordion.Header>
					<Accordion.Body>
						<NewTask />
					</Accordion.Body>
				</Accordion.Item>
				</Accordion>
			</div>
		);
	}
};
export default ToggleList;
