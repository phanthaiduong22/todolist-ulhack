import React from "react";
// import {icons} from "../../modules/icons";

function Task(task, props) {
//   const className = "task" + (!task.done ? "" : "-checked")
  const className = "task" 

  return (
    <section className={className}>
      <div className="row">
        {/* <label className="check">
          <input className="check-input" type="checkbox" checked={task.done} onChange={props.doneTask}/>
          <span className="check-box left-space-sm" id="checkbox">
            <Icon class="icon-sm" href={icons.check}/>
          </span>
        </label> */}
        {/* <p className="simple-text left-space-sm todo-heading">{task.name}</p> */}
        <p className="simple-text left-space-sm todo-heading">{task.name}</p>
      </div>
      {/* <div className="row g1 right-space-sm">
        <IconBtn class="tertiary-icon-btn-sm" iconClass="icon-sm" href={icons.pen} onClick={props.openModal}/>
        <IconBtn class="tertiary-icon-btn-sm" iconClass="icon-sm" href={icons.delete} onClick={props.deleteTask}/>
      </div> */}
    </section>
  )
}
export default Task