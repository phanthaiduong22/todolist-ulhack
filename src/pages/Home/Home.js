import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import AddTask from "../../components/AddTask/AddTask";
import AddSection from "../../components/AddSection/AddSection";
import ToggleList from "../../components/ToggleList/ToggleList";
import callAPI from "../../utils/apiCaller";
import { Container } from "react-bootstrap";

class Home extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      redirect: "",
      tasks: [],
    };
  }
  componentDidMount = () => {
    const username = localStorage.getItem("username");
    if (username === null) {
      this.setState({ redirect: "/login" });
    } else {
      callAPI(`/tasks/${username}`, "GET", {})
        // .then((response) => response.json())
        .then((response) => this.setState({ tasks: response.data }));
    }
  };
  render() {
    let { redirect, tasks } = this.state;
    console.log(tasks);
    if (redirect) {
      this.setState({ redirect: "" });
      return <Redirect to={redirect} />;
    }
    return (
      <Container>
        <AddTask />
        <AddSection />
        <ToggleList tasks={tasks} />
        {/* <ProgressBar /> */}
      </Container>
    );
  }
}

export default Home;
