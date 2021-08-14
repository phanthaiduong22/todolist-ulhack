import { Component } from "react";
import { Redirect } from "react-router";
import { Container, Form } from "react-bootstrap";
import RoundedTitle from "../RoundedTitle/RoundedTitle";
import ItemList from "../ItemList/ItemList"
import callAPI from "../../utils/apiCaller";
class Mission extends Component {
	constructor(props) {
	  super(props);
	  this.state = {
		tasks: [],
	  };
	  this.state.mission = this.props.mission
	  this.state.username = this.props.username
	}
	handleKeyDownCheckList = (e) => {
	  if (e.keyCode == 13) {
		let messeage = e.target.value;
		let username = this.state.username
		callAPI(`/missions/${username}/messages`, "POST", {
	      username,
		  messeage,
		  mission_id: this.state.mission.mission_id
	    })
	      .then((response) => {
	        this.setState({ tasks: response.data.tasks });
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
	    console.log("hi");
	    callAPI(`/tasks/${username}/today`, "GET", {
	      username,
	    })
	      .then((response) => {
	        this.setState({ tasks: response.data.tasks });
	      })
	      .catch((e) => {
	        console.log(e);
	      });
	  }
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
			<RoundedTitle title={this.state.mission.mission_name} />
			<ItemList />
			<Form.Control 
			  className = "p-3 mb-4"
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