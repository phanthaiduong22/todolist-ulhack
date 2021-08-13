import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import AddTaskButton from "../../components/AddTask/AddTask";
import ToggleList from "../../components/ToggleList/ToggleList";
import { MDBInput} from "mdbreact";
import callAPI from "../../utils/apiCaller";
import Moment from 'react-moment';
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
    let { redirect, tasks, username} = this.state;
    console.log(tasks)
    if (redirect) {
      this.setState({ redirect: "" });
      return <Redirect to={redirect} />;
    }
    return (
      <>
          <AddTaskButton />
          <ToggleList tasks={tasks} username={username}/>
          <Moment format="YYYY/MM/DD"></Moment>
          {/* <ProgressBar /> */}
      </>
    );
  }
}

export default Home;
