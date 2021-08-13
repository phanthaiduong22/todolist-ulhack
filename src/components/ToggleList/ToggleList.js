import React, { Component } from "react";
import { Accordion } from "react-bootstrap";
import Task from "../Task/Task";

class ToggleList extends Component {
  constructor(props) {
	super(props)
  } 

  render() {
    // let { tasks } = this.props.tasks;
	// console.log(tasks)
	// console.log(this.props)
    return (
      <div>
        <Accordion>
          <Accordion.Item eventKey="0">
            <Accordion.Header>Recently Assigned</Accordion.Header>
            <Accordion.Body>
              {this.props.tasks.map((task) => {
                return <Task task={task} />;
              })}
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </div>
    );
  }
}
// function ToggleList(props) {
// 	return (
// 		<div>
//         <Accordion>
//           <Accordion.Item eventKey="0">
//             <Accordion.Header>Recently Assigned</Accordion.Header>
//             <Accordion.Body>
//               {this.props.tasks.map((task) => {
//                 return <Task task={task} />;
//               })}
//             </Accordion.Body>
//           </Accordion.Item>
//         </Accordion>
//       </div>
// 	)
// }


export default ToggleList;


