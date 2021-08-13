import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import AddTaskButton from "../../components/AddTask/AddTask";
import ToggleList from "../../components/ToggleList/ToggleList";
import ProgressBar from "../../components/ProgressBar/ProgressBar";
import { MDBInput, MDBProgress } from "mdbreact";
import callAPI from "../../utils/apiCaller";
import Task from "../../components/Task/Task";
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
    } else
    {
      callAPI(`/tasks/${username}`, "GET", {})
      // .then((response) => response.json())
      .then((response) => this.setState({tasks: response.data}))
    }
  };
  render() {
    let { redirect, tasks} = this.state;
    console.log(tasks)
    if (redirect) {
      this.setState({ redirect: "" });
      return <Redirect to={redirect} />;
    }
    return (
      <>
        <AddTaskButton />
        <div className="form-group">
          <MDBInput label="Large input" size="lg" />
          <MDBInput label="Medium input" />
          <MDBInput label="Small input" size="sm" />

          <ToggleList tasks={tasks}/>
          {/* <ProgressBar /> */}
        </div>
      </>
    );
  }
}

export default Home;
