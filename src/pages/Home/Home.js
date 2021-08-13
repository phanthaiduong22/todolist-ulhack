import React, { Component } from "react";
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import NewTask from "../../components/NewTask/NewTask"
import ProgressBar from "../../components/ProgressBar/ProgressBar";
import ToggleList from "../../components/ToggleList/ToggleList"
import { MDBInput, MDBProgress } from "mdbreact";
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
class Home extends Component {
  constructor() {
    super();
    this.state = {};
  }
  render() {
    return (
      // <Container fluid >
      //   <Row>
      //     <Col>
      //       <NewTask />
      //     </Col>
      //   </Row>
      // </Container>

      <div className="form-group">
        <MDBInput label="Large input" size="lg" />
        <MDBInput label="Medium input" />
        <MDBInput label="Small input" size="sm" />

        <div>
          <ProgressBar />
        </div>

        <ToggleList />
      </div>
    );
  }
}

export default Home;
