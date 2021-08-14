import React, { Component } from "react";
import "react-circular-progressbar/dist/styles.css";
import { Redirect } from "react-router-dom";
import { Container, Form } from "react-bootstrap";
import callAPI from "../../utils/apiCaller";
import RoundedTitle from "../../components/RoundedTitle/RoundedTitle";
import ItemList from "../../components/ItemList/ItemList";
import Mission from "../../components/Mission/Mission";
import AddMission from "../../components/AddMission/AddMission"

class MissionAndVision extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
    };
  }
  handleKeyDownCheckList = (e) => {
    if (e.keyCode == 13) {
      let messeage = e.target.value;
    }
  };
  componentDidMount = () => {
    // const username = localStorage.getItem("username");
    // if (username === null) {
    //   this.setState({ redirect: "/login" });
    // } else {
    //   console.log("hi");
    //   callAPI(`/tasks/${username}/today`, "GET", {
    //     username,
    //   })
    //     .then((response) => {
    //       this.setState({ tasks: response.data.tasks });
    //     })
    //     .catch((e) => {
    //       console.log(e);
    //     });
    // }
  };

  render() {
    return (
      <Container>
        <AddMission />
        <Mission />
      </Container>
    )
  }

}

export default MissionAndVision;