import React from "react"
import trashIcon from "./assets/trash-solid.svg"
import editIcon from "./assets/pen-solid.svg"

export default function Todo({data, toggleComplete, toggleDelete, toggleEdit}) {

    function handleEdit() {
        toggleEdit(data.taskId, data.taskName)
    }

    return (

        <div className="tasks" id={data.taskId} key={data.taskId}>
            <input 
            type="checkbox"
            className="complete-status"
            checked={data.completed}
            onChange={toggleComplete}
            name="completed"
            />
            <p className="time-status"><span className={data.completed ? "striked-off" : null}>
                {data.taskName}</span> <br /> {data.taskTime} {data.taskDate}
            </p>
            <div className="img-cont right-margin" onClick={toggleDelete}>
                <img src={trashIcon} className="svg-icons" />
            </div>
            <div className="img-cont" onClick={handleEdit}>
                <img src={editIcon} className="svg-icons" />
            </div>
        </div>

    )

}