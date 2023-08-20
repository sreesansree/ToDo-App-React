import React ,{ useEffect, useState } from "react";
import { Header } from "./components/Header";
import { Tasks } from "./components/Tasks";
import './styles/App.css';

const LOCAL_STORAGE_KEY = 'todo:tasks';

function App() {
  const [tasks, setTasks] = useState([]);
  const [emptyFieldError, setEmptyFieldError] = useState(false); // New state for empty field error

  function loadSavedTasks() {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) {
      setTasks(JSON.parse(saved));
    }
  }

  function setTasksAndSave(newTasks) {
    setTasks(newTasks);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newTasks));
  }

  useEffect(() => {
    loadSavedTasks();
  }, [])

  function addTask(taskTitle) {
    if (taskTitle.trim() === '') {
      // Display error message and return
      setEmptyFieldError(true);

      setTimeout(() => {
        setEmptyFieldError(false);
      }, 4000);

      return;
    }
    // Clear error message if not empty
    setEmptyFieldError(false);

    setTasksAndSave([...tasks, {
      id: crypto.randomUUID(),
      title: taskTitle,
      isCompleted: false
    }]);
  }

  function editTasksById(taskId, newTitle) {
    const newTasks = tasks.map(task => {
        if (task.id === taskId) {
            return {
                ...task,
                title: newTitle
            };
        }
        return task;
    });
    setTasksAndSave(newTasks);
}

  function deleteTaskById(taskId) {
    const newTasks = tasks.filter(task => task.id !== taskId);
    setTasksAndSave(newTasks);
  }

  function toggleTaskCompletedById(taskId) {
    const newTasks = tasks.map(task => {
      if (task.id === taskId) {
        return {
          ...task,
          isCompleted: !task.isCompleted
        }
      }
      return task;
    });
    setTasksAndSave(newTasks);
  }

  return (
    <>
      <Header handleAddTask={addTask} />
      {emptyFieldError && <p className="error-message">Please enter a task title.</p>}
      <Tasks
        tasks={tasks}
        onEdit={editTasksById}
        onDelete={deleteTaskById}
        onComplete={toggleTaskCompletedById}
      />
    </>
  )
}

export default App