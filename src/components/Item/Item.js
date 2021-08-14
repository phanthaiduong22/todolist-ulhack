import React, { Component } from "react";
import callAPI from "../../utils/apiCaller";
class Item extends Component {
  constructor(props) {
    super();

    this.state = {
      checked: false,
    };

    this.handleClick = this.handleClick.bind(this);
  }
  componentDidMount = () => {
    this.setState({
      checked: this.props.message.is_done,
    });
  };

  handleClick(e) {
    let message_id = this.props.message.message_id;
    let username = this.props.username;
    if (e.target.value == 0) {
      callAPI(`/missions/${username}/messages/${message_id}`, "PUT", {
        message_id,
      })
        .then((response) => {
          this.setState({
            checked: true,
          });
        })
        .catch((e) => {
          console.log(e);
        });
    } else {
      callAPI(`/missions/${username}/messages/${message_id}`, "DELETE", {
        message_id,
      })
        .then((response) => {
          this.setState({
            checked: false,
          });
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }
  render() {
    let text = this.state.checked ? (
      <>
        <input
          type="checkbox"
          value={this.state.checked}
          onClick={this.handleClick}
          checked
        />
        &nbsp;
        <strike>{this.props.message.message}</strike>
      </>
    ) : (
      <>
        <input
          type="checkbox"
          value={this.state.checked}
          onClick={this.handleClick}
        />
        &nbsp;
        {this.props.message.message}
      </>
    );
    return (
      <div className="row">
        <div className="col-md-12">
          {text}
          <hr />
        </div>
      </div>
    );
  }
}

export default Item;
