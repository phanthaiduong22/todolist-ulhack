import React from "react";
import { Row, Col, Container, FormControl, InputGroup, Table } from "react-bootstrap";
import "./Task.scss";
// import {icons} from "../../modules/icons";

function Task({ task, ...props }) {
  const className = "task" + (task.is_done == 0 ? "" : "-checked")
  console.log(task.is_done);

  return (
	<>	
		<div class="light p-3 mb-2 rounded border border-dark">
			<Container>
				<Row>
					<Col>{task.task_id}</Col>
					<Col>{task.task_name}</Col>
					<Col>{task.due_date}</Col>
					<Col>{task.is_importance == 1 ? "yes" : "no"}</Col>
				</Row>
			</Container>
		</div>
		{/* <Table striped bordered hover>
				<tbody>
					<tr>
						<td>{task.task_id}</td>
						<td>{task.task_name}</td>	
						<td>{task.due_date}</td>
						<td>{task.is_importance == 1 ? "yes" : "no"}</td>
					</tr>
				</tbody>
		</Table> */}
	</>
  );
}
export default Task;
