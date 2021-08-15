import React from "react";
import { OverlayTrigger, Button, Popover} from "react-bootstrap";
import "./Legend.scss"


function Legend() {
	const popover = (
		<Popover id="popover-basic">
			<Popover.Header as="h3">Task Color</Popover.Header>
			<Popover.Body>
				<div className = "task-done mb-2 rounded border border-dark ">
					<h5 className="mt-2 ml-2"> This task is done</h5>
				</div>
				<div className = "task-important mb-2 rounded border border-dark">
					<h5 className="mt-2 ml-2"> This task is important</h5>
				</div>
				<div className = "task-urgent mb-2 rounded border border-dark">
					<h5 className="mt-2 ml-2"> This task is urgent</h5>
				</div>
				<div className = "task-urgent-important mb-2 rounded border border-dark">
					<h5 className="mt-2 ml-2"> This task is both urgent and important</h5>
				</div>
			</Popover.Body>
		</Popover>
	);

	return (
		<>
			<OverlayTrigger
				placement="bottom"
				delay={{ show: 150, hide: 200 }}
				overlay={popover}
			>
				<Button variant="info">Legend</Button>
			</OverlayTrigger>
		</>
	);
}

export default Legend;
