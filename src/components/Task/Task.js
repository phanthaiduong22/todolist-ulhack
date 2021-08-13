import React from "react";
import { Row, Col, Container, FormControl, InputGroup, Table, Button } from "react-bootstrap";
import "./Task.scss";
import moment from 'moment';
// import {icons} from "../../modules/icons";

function Task({ task, ...props }) {
  
  const duration = (moment.duration(moment(task.due_date).diff(moment())))._data.days // Get duration to due date, calculated in hours
  const is_urgent = (duration < 3 && duration > 0) ? true : false // if the task is due in 3 days -> it's urgent
  console.log(duration)
  const className = "task" + (task.is_importance == 1 ? "-important" : (is_urgent ? "-urgent":(task.is_done == 1 ? "-checked" : "")))
  console.log({className});

  return (
	<>	
		<section className = {className}>
			<div class="${className}bg-light p-3 mb-2 rounded border border-dark">
				<Container>
					<Row class="row">
						<Col>{task.task_id}</Col>
						<Col>{task.task_name}</Col>
						<Col>{task.due_date}</Col>
						<Col>{task.is_importance == 1 ? "yes" : "no"}</Col>
						<Col md="auto"><Button variant="outline-success">Done</Button></Col>
						<Col md="auto"><Button variant="outline-danger">Delete</Button></Col>
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
		</section>
	</>
  );
}
export default Task;
