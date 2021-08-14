import { Component } from "react";
import { Redirect } from "react-router";
import { Container, Form } from "react-bootstrap";
import RoundedTitle from "../RoundedTitle/RoundedTitle";
import ItemList from "../ItemList/ItemList"
class Mission extends Component {
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
		  <Container>
			<RoundedTitle title="One year goal" />
			<ItemList />
			<Form.Control
			  size="lg"
			  type="text"
			  placeholder="Enter new mission"
			  onKeyDown={this.handleKeyDownCheckList}
			/>
		  </Container>
		</Container>
	  );
	}
}

export default Mission