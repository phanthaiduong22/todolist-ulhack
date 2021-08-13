import React from "react";
import { Row, Col, Container, Popover, Button, OverlayTrigger } from "react-bootstrap";
import "./Task.scss";
import moment from 'moment';
import callAPI from "../../utils/apiCaller";
// import {icons} from "../../modules/icons";

function Task({task }) {
  
	const duration = (moment.duration(moment(task.due_date).diff(moment())))._data.days // Get duration to due date, calculated in hours
	const formated_date = moment(task.due_date).format("dddd, MMMM Do YYYY")
	const is_urgent = (duration < 3 && duration > 0) ? true : false // if the task is due in 3 days -> it's urgent
	const className = "task" + (task.is_done === 1 ? "-checked" : (is_urgent ? "-urgent":(task.is_importance === 1 ? "-important" : "")))

	const username = localStorage.getItem("username"); // Get username from localStorage, for demo purpose
	// Update the task if done
	const doneOnChange = () => {
			callAPI(`/tasks/${username}/${task.task_id}`, "PUT", {})
			.then((response) => window.location.reload())
			.catch((e) => console.log("Error"))
	}
	// Delete tasks if no more needed
	const deleteOnChange = () => {
		callAPI(`/tasks/${username}/${task.task_id}`, "DELETE", {})
		.then((response) => window.location.reload())
		.catch((e) => console.log("Error"))
	}

	const popover = (
		<Popover id="popover-basic">
		  <Popover.Header as="h3">Task info</Popover.Header>
		  <Popover.Body>
			<div>
				<p> <strong>Due Date:</strong> {formated_date}</p>
			</div>

			<div>
				<p> <strong>Important:</strong> {task.is_importance == 1 ? "Yes" : "No"}</p>
			</div>
		  </Popover.Body>
		</Popover>
	  );

  	return (
		<>	
			<section className={className}>
				<div class="${className} text-gray p-3 mb-2 rounded border border-dark">
					<Container>
						<Row class="row align-items-center">
							<Col xs={1}>
								<div class="border-item">
									{task.task_id}
								</div>
							</Col>
							<Col xs={7}>
								<div class="border-item align-center">
									{task.task_name}
								</div>
							</Col>
							{/* <Col>
								<div class="border-item">
									{task.due_date}
								</div>
							</Col>
							<Col xs={1}>
								<div class="border-item">
									{task.is_importance == 1 ? "yes" : "no"}
								</div>
							</Col> */}
							<Col xs="1">  
								<OverlayTrigger trigger="click" placement="bottom" overlay={popover}>
									<Button variant="outline-primary">INFO</Button>
								</OverlayTrigger>
  							</Col>	
							<Col xs="1"><Button variant="outline-success" onClick={doneOnChange}>Done</Button></Col>
							<Col xs="1"><Button variant="outline-danger" onClick={deleteOnChange}>Delete</Button></Col>
						</Row>
					</Container>
				</div>
			</section>
		</>
  	);
}
export default Task;
