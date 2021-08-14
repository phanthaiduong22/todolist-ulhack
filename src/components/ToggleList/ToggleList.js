import React, { Component } from "react";
import { Accordion, Col, Container, Row } from "react-bootstrap";
import Task from "../Task/Task";

class ToggleList extends Component {
  render() {
    return (
      <>
        <Container>
          {this.props.sections.map((section, index) => {
            return (
              <Row key={index}>
                <Col>
                  <Accordion>
                    <Accordion.Item>
                      <Accordion.Header>
                        {section.section_name}
                      </Accordion.Header>
                      <Accordion.Body>
                        {section.tasks.map((task, index) => {
                          return <Task task={task} index={index} key={index} />;
                        })}
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
                </Col>
              </Row>
            );
          })}
        </Container>
      </>
    );
  }
}

export default ToggleList;
