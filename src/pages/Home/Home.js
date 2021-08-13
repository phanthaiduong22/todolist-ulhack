import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import AddTaskButton from "../../components/AddTask/AddTask";

class Home extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      redirect: "",
    };
  }
  componentDidMount = () => {
    const username = localStorage.getItem("username");
    if (username === null) {
      this.setState({ redirect: "/login" });
    }
  };
  render() {
    let { redirect } = this.state;
    if (redirect) {
      this.setState({ redirect: "" });
      return <Redirect to={redirect} />;
    }
    return <AddTaskButton />;
  }
}

export default Home;
