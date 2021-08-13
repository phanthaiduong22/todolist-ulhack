import React, { Component } from "react";
import { Accordion, Container } from "react-bootstrap";
import NewTask from "../NewTask/NewTask"
import Task from "../Task/Task";
// import { Navbar, Nav } from "react-bootstrap";
// import { LinkContainer } from "react-router-bootstrap";

class ToggleList extends Component {
	constructor() {
		super();
		this.state = { 
			tasks: [{
				name: "test",
				done: "true"
			}]
		};
	  }

	addTask(task){
		this.setState(state => {
		  let {tasks} = state;
		  tasks.push({
			// id: tasks.length === 0 ? 0 : tasks.length,
			name: task,
			// done: false
		  });
		  return tasks;
		})
	}

	handleKeyPress = (event, task) => {
		if(event.key === 'Enter'){
		  this.addTask(task)
		}
	}

	render(){
		let {tasks} = this.state;
		return (
			<div>
				<Accordion>
				<Accordion.Item eventKey="0">
					<Accordion.Header>Recently Assigned</Accordion.Header>
					<Accordion.Body>
						<Task task={tasks}/>
					</Accordion.Body>
				</Accordion.Item>
				</Accordion>
			</div>
		);
	}
};
export default ToggleList;
