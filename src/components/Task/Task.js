import React from "react";
import {
  Row,
  Col,
  Container,
  Popover,
  Button,
  OverlayTrigger,
} from "react-bootstrap";
import "./Task.scss";
import moment from "moment";
import callAPI from "../../utils/apiCaller";

function Task({ task, index }) {
  const duration = moment.duration(moment(task.due_date).diff(moment()))._data
    .days; // Get duration to due date, calculated in hours
  const formated_date = moment(task.due_date).format("dddd, MMMM Do YYYY");
  const is_urgent = duration < 3 && duration > -1 ? true : false; // if the task is due in 3 days -> it's urgent
  console.log(`${task.task_name}:${is_urgent}:${duration}`);
  let className = "task";
  if (task.is_done == 1) {
    className = "task-done";
  } else if (task.is_importance == 1 && is_urgent) {
    className = "task-urgent-important";
  } else if (task.is_importance == 1) {
    className = "task-important";
  } else if (is_urgent) {
    className = "task-urgent";
  }

  const username = localStorage.getItem("username"); // Get username from localStorage, for demo purpose
  // Update the task if done
  const doneOnChange = () => {
    callAPI(`/tasks/${username}/${task.task_id}`, "PUT", {})
      .then((response) => window.location.reload())
      .catch((e) => console.log("Error"));
  };
  // Delete tasks if no more needed
  const deleteOnChange = () => {
    callAPI(`/tasks/${username}/${task.task_id}`, "DELETE", {})
      .then((response) => window.location.reload())
      .catch((e) => console.log("Error"));
  };

  const popover = (
    <Popover id="popover-basic">
      <Popover.Header as="h3">Task info</Popover.Header>
      <Popover.Body>
        <div>
          <p>
            {" "}
            <strong>Due Date:</strong> {formated_date}
          </p>
        </div>
        <div>
          <p>
            {" "}
            <strong>Important:</strong>{" "}
            {task.is_importance === 1 ? "Yes" : "No"}
          </p>
        </div>
      </Popover.Body>
    </Popover>
  );

  return (
    <>
      <section className={className}>
        <div className="${className} text-gray p-3 mb-2 rounded border border-dark">
          <Container>
            <Row className="align-items-center">
              <Col xs={1}>
                <div class="border-item">{index + 1}</div>
              </Col>
              <Col xs={6}>
                <div class="border-item align-center">{task.task_name}</div>
              </Col>
              <Col xs={3}>
                <div class="border-item align-center">{formated_date}</div>
              </Col>
              {/* <Col xs="1">  
								<OverlayTrigger trigger="click" placement="bottom" overlay={popover}>
									<Button variant="outline-primary">INFO</Button>
								</OverlayTrigger>
  							</Col>	 */}
              <Col xs="1">
                <Button variant="outline-success" onClick={doneOnChange}>
                  Done
                </Button>
              </Col>
              <Col xs="1">
                <Button variant="outline-danger" onClick={deleteOnChange}>
                  Delete
                </Button>
              </Col>
            </Row>
          </Container>
        </div>
      </section>
    </>
  );
}
export default Task;
