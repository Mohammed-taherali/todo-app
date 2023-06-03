import React from "react"

export default function AddTask({handleAdd}) {
    
    function handleSubmit(event) {
        event.preventDefault()
        const {target} = event
        handleAdd(target.userName.value, target.completeStatus.value)
    }
    
    return (
        <div className="add-form">
            <h2 className="add-title">ADD TASK</h2>
            <form onSubmit={handleSubmit}>
                <label className="label-name" htmlFor="userName">Title</label>
                    <input 
                        type="text" 
                        name="userName"
                        placeholder="Eg: Learn React!"
                        id="userName"
                        className="task-name-input"
                    />
                    <select className="select-menu add-select" name="completeStatus" id="completeStatus">
                        <option value="incomplete">Incomplete</option>
                        <option value="complete">Complete</option>
                    </select>
                <button id="add-button">Add Task</button>
            </form>
        </div>
    )
}