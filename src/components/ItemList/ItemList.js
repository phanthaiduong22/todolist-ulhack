import React, { Component } from "react";
import ReactBootstrap from "react-bootstrap";
import Item from "../Item/Item";

class ItemList extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    let messages = this.props.messages;
    let items = messages.map((item) => <Item message={item} username={this.props.username}/>);
    return <h4>{items}</h4>;
  }
}

export default ItemList;
