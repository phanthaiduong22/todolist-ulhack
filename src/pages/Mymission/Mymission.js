import React, { Component } from "react";
import "react-circular-progressbar/dist/styles.css";
import { Container } from "react-bootstrap";
import callAPI from "../../utils/apiCaller";
import Mission from "../../components/Mission/Mission";
import AddMission from "../../components/AddMission/AddMission";

class MissionAndVision extends Component {
  constructor(props) {
    super(props);
    this.state = {
      missions: [],
      username: "",
    };
  }
  componentDidMount = () => {
    const username = localStorage.getItem("username");
    if (username === null) {
      this.setState({ redirect: "/login" });
    } else {
      this.setState({ username });
      callAPI(`/missions/${username}`, "GET", {})
        .then((response) => {
          this.setState({ missions: response.data.missions });
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };

  render() {
    return (
      <Container>
        <AddMission />
        {this.state.missions.map((mission) => {
          return <Mission mission={mission} username={this.state.username} />;
        })}
      </Container>
    );
  }
}

export default MissionAndVision;
