import React, { Component } from "react";
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import NewTask from "../../components/NewTask/NewTask"
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

      <InputGroup className="mb-3">
      <FormControl
        placeholder="New Task..."
        aria-label="Username"
        aria-describedby="basic-addon1"
      />
    </InputGroup>
    );
  }
}

export default Home;
