import React, { Component } from "react";
class Item extends Component {
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

export default Item;
