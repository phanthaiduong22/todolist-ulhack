import { Button, Popover, Tooltip } from "bootstrap";
import React, { Component } from "react";
import { OverlayTrigger } from "react-bootstrap";

function Legend() {

	const popover = (
		<Popover id="popover-basic">
			<Popover.Header as="h3">Popover right</Popover.Header>
			<Popover.Body>
				And here's some <strong>amazing</strong> content. It's very engaging.
				right?
			</Popover.Body>
		</Popover>
	);

	return (
		<>
			<section>
				<div className={`text-gray p-3 mb-2 rounded border border-dark`}>
					<OverlayTrigger trigger="click" placement="right" overlay={popover}>
						<Button variant="success">Click me to see</Button>
					</OverlayTrigger>
				</div>
			</section>
		</>
	);
}

export default Legend;
