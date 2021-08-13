import React from "react";

function Icon(props) {
    return (
        <svg className={props.class} aria-hidden="true">
            <use xlinkHref={props.href} />
        </svg>
    );
}

export default Icon;