import React, { Component } from "react";
import "react-circular-progressbar/dist/styles.css";
import { Redirect } from "react-router-dom";
import { Accordion, Col, Container, Row } from "react-bootstrap";
import Task from "../../components/Task/Task";
import callAPI from "../../utils/apiCaller";

class Todoist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
    };
  }

  componentDidMount = () => {
    const username = localStorage.getItem("username");
    if (username === null) {
      this.setState({ redirect: "/login" });
    } else {
      callAPI(`/tasks/${username}/today`, "GET", {
        username,
      })
        .then((response) => {
          this.setState({ tasks: response.data.tasks });
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };

  render() {
    let { redirect, tasks } = this.state;
    if (redirect) {
      this.setState({ redirect: "" });
      return <Redirect to={redirect} replace />;
    }
    return (
      <Container>
        <Row>
          <Col>
            <Accordion>
              <Accordion.Item>
                <Accordion.Header>Have to do today</Accordion.Header>
                <Accordion.Body>
                  {tasks.map((task, index) => {
                    return <Task task={task} index={index} key={index} />;
                  })}
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </Col>
        </Row>
      </Container>
    );
  }
}
export default Todoist;
