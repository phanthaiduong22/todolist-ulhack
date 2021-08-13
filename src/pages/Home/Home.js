import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import AddTaskButton from "../../components/AddTask/AddTask";
import ToggleList from "../../components/ToggleList/ToggleList";
import ProgressBar from "../../components/ProgressBar/ProgressBar";
import { MDBInput, MDBProgress } from "mdbreact";
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
    return (
      <>
        <AddTaskButton />
        <div className="form-group">
          <MDBInput label="Large input" size="lg" />
          <MDBInput label="Medium input" />
          <MDBInput label="Small input" size="sm" />

          <div>
            <MDBProgress material value={50} className="my-s" />
          </div>

          <ToggleList />
          <ProgressBar />
        </div>
      </>
    );
  }
}

export default Home;
