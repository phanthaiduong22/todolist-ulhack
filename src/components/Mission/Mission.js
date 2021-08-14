import { Component } from "react";
import { Container, Form } from "react-bootstrap";
import RoundedTitle from "../RoundedTitle/RoundedTitle";
import ItemList from "../ItemList/ItemList";
import callAPI from "../../utils/apiCaller";
class Mission extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
    };
    this.state.mission = this.props.mission;
    this.state.username = this.props.username;
  }

  handleKeyDownCheckList = (e) => {
    if (e.keyCode === 13) {
      let message = e.target.value;
      let username = this.state.username;
      callAPI(`/missions/${username}/messages`, "POST", {
        message,
        mission_id: this.state.mission.mission_id,
      })
        .then((response) => {
          window.location.reload();
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };

  componentDidMount = () => {
    const username = localStorage.getItem("username");
    if (username === null) {
      this.setState({ redirect: "/login" });
    } else {
      const mission_id = this.state.mission.mission_id;
      callAPI(`/missions/${mission_id}/${username}/messages`, "GET", {})
        .then((response) => {
          this.setState({ messages: response.data.messages });
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };

  render() {
    let { messages, username } = this.state;
    return (
      <Container>
        <RoundedTitle title={this.state.mission.mission_name} />
        <ItemList messages={messages} username={username} />
        <Form.Control
          className="p-3 mb-4"
          size="lg"
          type="text"
          placeholder="Enter new mission"
          onKeyDown={this.handleKeyDownCheckList}
        />
      </Container>
    );
  }
}

export default Mission;
