import React, { Component } from "react";
import ReactBootstrap from 'react-bootstrap';
import Item from "../Item/Item"

class ItemList extends Component {
	constructor(props) {
	  super(props);
		console.log("from ItemList")
		console.log(this.props)
	//   this.state.messages = this.props.messages
	//   console.log(this.state.messages)
	}
	render() {
	//   let items = this.state.messages.map((item) => <Item message = {item.message}/>);
	//   return <h4>{items}</h4>;
	  return <h4>items</h4>;
	}
}

export default ItemList