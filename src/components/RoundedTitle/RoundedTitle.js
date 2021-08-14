import React, { Component } from "react";
import "./RoundedTitle.css";

class RoundedTitle extends Component {
  render() {
    return (
      <div className="roundedTitle">
        <h2>{this.props.title}</h2>
      </div>
    );
  }
}

export default RoundedTitle;
