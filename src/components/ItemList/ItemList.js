import React, { Component } from "react";
import ReactBootstrap from 'react-bootstrap';
import Item from "../Item/Item"

let item2 = <Item message="a new message" />;
let item3 = <Item message="another message" />;
let item4 = <Item message="one more task" />;
class ItemList extends React.Component {
	constructor(props) {
	  super(props);
	  this.state = {
		  allItem: [item2, item3, item4]
	  }
	}
	render() {
	  let items = this.state.allItem.map((thing) => thing);
	  return <h4>{items}</h4>;
	}
}

export default ItemList