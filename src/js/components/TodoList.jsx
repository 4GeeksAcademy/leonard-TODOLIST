import react, { useState, useEffect } from "react";
import "../../styles/style.css";

const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (event) => {
    if (event.key === "Enter" && newTask.trim() !== "") {
      const newTasksObject = {
        id: Date.now(),
        label: newTask,
        is_done: false,
      };
      setTasks([...tasks, newTasksObject]);
      setNewTask("");
    }
  };
  const deleteTask = (taskId) => {
    setTasks(tasks.filter((tasks) => taskId !== taskId.id));
    console.log(`task with id ${taskId}deleted`);
  };
  return(
    
<div className="todo-container">
      <h1 className="title">To do list</h1>
      <input
        type="text"
        placeholder="Add a task and click enter"
        value={newTask} // Bind input value to state
        onChange={(e) => setNewTask(e.target.value)} // Update state on every keystroke
        onKeyDown={addTask} // Call addTask function when user presses a key
        className="task-input"
      />
      <ul className="task-list">
        {tasks.length === 0 ? (
          <li className="no-tasks">No task, add task</li>
        ) : (
          // Map through tasks array and create a list item for each task
          tasks.map((task, index) => (
            <li key={index} className="task-item">
              {task.label}
              <button
                className="delete-button"
                onClick={() => deleteTask(task.id)} // Call deleteTask function with task id
              >
                ✖
              </button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default TodoList