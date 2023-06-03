import React, {useState, useEffect} from "react"
import AddTask from "./AddTask"
import Todo from "./Todo"

let taskId = 0

export default function Task() {

    // Boolean to show AddTask component
    const [isAddTask, setIsAddTask] = useState(false)
    // State variable that stores the actual task Data
    const [taskData, setTaskData] = useState(
        () => JSON.parse(localStorage.getItem("taskData")) || []
    )
    // Filter can be "all", "complete", "incomplete"
    const [filter, setFilter] = useState("all") 

    // Update the data in localStorage
    useEffect(() => {
        localStorage.setItem("taskData", JSON.stringify(taskData))
    }, [taskData])

    function getTime() {
        /*
        Helper function that returns the current date and time
        @returns {{date: string, time: string}}
        */
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0')
        var mm = String(today.getMonth() + 1).padStart(2, '0')
        var yyyy = today.getFullYear()
        today = mm + '/' + dd + '/' + yyyy

        let timeToday = new Date().toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
        return [today, timeToday]
    }

    function handleAdd(title, status) {
        /*
        This function handles addition of new task to the taskData array
        @param {string} title - title of the task
        @param {string} status - Either "complete" or "incomplete"
        */

        const [today, timeToday] = getTime()
        taskId += 1

        setTaskData(prevData => {
            return [
                {
                    "taskName": title,
                    "taskDate": today,
                    "taskTime": timeToday,
                    "taskId": taskId,
                    "completed": status === "complete" ? true : false,
                    "visible": true
                },
                ...prevData
            ]
        })
        setIsAddTask(prev => !prev)
    }

    function toggleComplete(event) {
        /*
        This function toggles the completion status of the respective task
        */
        let ind = event.target.parentElement.id - 1
        setTaskData(prevTasks => {
            return prevTasks.map(elem => {
                return elem.taskId === ind + 1 ? {...elem, completed: !elem.completed} : elem
            })
        })
    }

    function toggleDelete(event) {
        /*
        This function deletes the respective task
        */
        const {target} = event
        let id = target.parentElement.parentElement.id
        setTaskData(taskData.filter(task => task.taskId != id))
    }

    function toggleEdit(id, taskName) {
        /*
        Handles editing of the task name
        */
        let newTaskName = window.prompt("Enter new task name: ", taskName)
        setTaskData(prevTasks => {
            return prevTasks.map(task => (
                task.taskId == id ? {...task, taskName: newTaskName ? newTaskName : taskName} : task
            ))
        })
    }

    const filteredTasks = taskData.filter(task => {
        if (filter === "complete") {
            return task.completed
        } else if (filter === "incomplete") {
            return !task.completed
        } else {
            return true
        }
    })

    const todo = filteredTasks.map(task => (
        <Todo 
            key={task.taskId}
            data={task}
            toggleComplete={toggleComplete}
            toggleDelete={toggleDelete}
            toggleEdit={toggleEdit}
        />
    ))

    return (
        <main className="main-section">
            <h1 id="title">TODO LIST</h1>
            <div className="header-section">
                <button 
                    id="add-button" 
                    onClick={() => setIsAddTask(prev => !prev)}
                >
                        {isAddTask ? "X": "Add Task"}
                </button>
                <select 
                    className="select-menu" 
                    name="select-menu" 
                    id="select-menu" 
                    onChange={(event) => setFilter(event.target.value)}
                >
                    <option value="all">All</option>
                    <option value="complete">Complete</option>
                    <option value="incomplete">Incomplete</option>
                </select>
            </div>
            {isAddTask && <AddTask handleAdd={handleAdd} />}
            <div className="task-cont">
                {todo.length > 0 ? todo : <h2 className="no-tasks">NO TODOS!</h2>}
            </div>
        </main>
    )
}
