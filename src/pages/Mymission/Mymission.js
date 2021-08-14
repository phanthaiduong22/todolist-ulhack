import React, { Component } from "react";
import "react-circular-progressbar/dist/styles.css";
import { Redirect } from "react-router-dom";
import { Container, Form } from "react-bootstrap";
import Task from "../../components/Task/Task";
import callAPI from "../../utils/apiCaller";
import "./Mymission.css";
class Mymission extends Component {
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
    let { redirect } = this.state;
    if (redirect) {
      this.setState({ redirect: "" });
      return <Redirect to={redirect} replace />;
    }
    return (
      <Container>
        <AppJumbotron title="One year goal" />
        <ItemList />
        <Form.Control
          size="lg"
          type="text"
          placeholder="Enter new mission"
          onKeyDown={this.handleKeyDownCheckList}
        />
      </Container>
    );
  }
}

class AppJumbotron extends React.Component {
  render() {
    return (
      <div className="jumbotron">
        <h2>{this.props.title}</h2>
      </div>
    );
  }
}

class Item extends React.Component {
  constructor(props) {
    super();

    this.state = {
      checked: false,
    };

    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(e) {
    this.setState({
      checked: !this.state.checked,
    });
  }
  render() {
    let text = this.state.checked ? (
      <strike>{this.props.message}</strike>
    ) : (
      this.props.message
    );
    return (
      <div className="row">
        <div className="col-md-12">
          <input type="checkbox" onClick={this.handleClick} />
          &nbsp;{text}
          <hr />
        </div>
      </div>
    );
  }
}

let item2 = <Item message="a new message" />;
let item3 = <Item message="another message" />;
let item4 = <Item message="one more task" />;

let allTheThings = [item2, item3, item4];
class ItemList extends React.Component {
  constructor(props) {
    super();
  }
  render() {
    let items = allTheThings.map((thing) => thing);
    return <h4>{items}</h4>;
  }
}

export default Mymission;
