import React, { Component } from "react";
import { Table } from "react-bootstrap";
import Task from "../Task/Task";
// import { FormControl, InputGroup } from "react-bootstrap";
// import {icons} from "../../modules/icons";

// function TaskTable({ task, ...props }) {
class TaskTable extends Component {
	constructor(props) {
		super(props)
	} 
	
	createRow(eachTask) {
		return[eachTask.task_id, eachTask.task_name, eachTask.due_date, eachTask.is_importance]

	}

	render() {
		// console.log(this.props)
		return (
			<>
				<Table striped bordered hover>
				<thead>
					<tr>
					<th>#</th>
					<th>eachTask Name</th>
					<th>Due Date</th>
					<th>Importance</th>
					</tr>
				</thead>
				<tbody>
				<tr>
						{/* <td>{task.task_id}</td>
						<td>{task.task_name}</td>	
						<td>{task.due_date}</td>
						<td>{task.is_importance == 1 ? "yes" : "no"}</td> */}
					</tr>
				</tbody>
				{/* <tbody
					<tr>
					<td>1</td>
					<td>Mark</td>
					<td>Otto</td>
					<td>@mdo</td>
					</tr>
					<tr>
					<td>2</td>
					<td>Jacob</td>
					<td>Thornton</td>
					<td>@fat</td>
					</tr>
					<tr>
					<td>3</td>
					<td colSpan="2">Larry the Bird</td>
					<td>@twitter</td>
					</tr>
				</tbody> */}
				</Table>
			</>
		);
	}
}
export default TaskTable;
