import React from "react";
import { Row, Col, Container, Button} from "react-bootstrap";
import "./Task.scss";
import moment from "moment";
import callAPI from "../../utils/apiCaller";


function Task({ task, index }) {
  const duration = moment.duration(moment(task.due_date).diff(moment()))._data
    .days; // Get duration to due date, calculated in hours
  const formated_date = moment(task.due_date).format("dddd, MMMM Do YYYY");
  const is_urgent = duration < 3 && duration > -1 ? true : false; // if the task is due in 3 days -> it's urgent
  let className = "task";
  if (task.is_done === 1) {
    className = "task-done";
  } else if (task.is_importance === 1 && is_urgent) {
    className = "task-urgent-important";
  } else if (task.is_importance === 1) {
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

  return (
    <>
      <section className={className} key={index}>
        <div className={`text-gray p-3 mb-2 rounded border border-dark`}>
          <Container>
            <Row className="align-items-center">
              <Col xs={1}>
                <div className="border-item">{index + 1}</div>
              </Col>
              <Col xs={6}>
                <div className="border-item align-center">{task.task_name}</div>
              </Col>
              <Col xs={3}>
                <div className="border-item align-center">{formated_date}</div>
              </Col>
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
