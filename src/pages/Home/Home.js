import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import ToggleList from "../../components/ToggleList/ToggleList";
import AddTask from "../../components/AddTask/AddTask";
import AddSection from "../../components/AddSection/AddSection";
import callAPI from "../../utils/apiCaller";
import Legend from "../../components/Legend/Legend";

class Home extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      redirect: "",
      tasks: [],
      sections: [
        {
          section_id: 0,
          username: "",
          section_name: "",
          tasks: [],
        },
      ],
    };
  }
  componentDidMount = () => {
    const username = localStorage.getItem("username");
    if (username === null) {
      this.setState({ redirect: "/login" });
    } else {
      callAPI(`/tasks/${username}`, "GET", {})
        .then((response) => {
          let tasks = response.data.tasks;
          callAPI(`/sections/${username}`, "GET", {})
            .then((response) => {
              let sections = response.data.sections;
              for (let i = 0; i < sections.length; ++i) {
                sections[i].tasks = [];
              }
              for (let i = 0; i < tasks.length; ++i) {
                for (let j = 0; j < sections.length; ++j) {
                  if (tasks[i].section_id === sections[j].section_id) {
                    sections[j].tasks.push(tasks[i]);
                    break;
                  }
                }
              }
              this.setState({ sections });
            })
            .catch((e) => console.log(e));
        })
        .catch((e) => console.log(e));
    }
  };

  render() {
    let { redirect, sections } = this.state;
    if (redirect) {
      this.setState({ redirect: "" });
      return <Redirect to={redirect} />;
    }
    return (
      <Container>
        <Row>
          <Col>
            <AddSection />
            <AddTask />
            <Legend/>
          </Col>
        </Row>
        <ToggleList sections={sections} />
      </Container>
    );
  }
}

export default Home;
