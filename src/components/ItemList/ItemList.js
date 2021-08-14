import React, { Component } from "react";
import ReactBootstrap from 'react-bootstrap';
import Item from "../Item/Item"

class ItemList extends React.Component {
	constructor(props) {
	  super(props);
		console.log(this.props)
	//   this.state.messages = this.props.messages
	}
	render() {
	//   let items = this.state.messages.map((item) => <Item message = {item.message}/>);
	//   return <h4>{items}</h4>;
	  return <h4>items</h4>;
	}
}

export default ItemList