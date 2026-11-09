
"use client";

import { createContext, useContext, useEffect, useState } from "react";

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [tasksLoaded, setTasksLoaded] = useState(false);

  // Load saved tasks
  useEffect(() => {
    const savedTasks = localStorage.getItem("ravd-tasks");

    if (savedTasks) {
      try {
        setTasks(JSON.parse(savedTasks));
      } catch (error) {
        console.error("Unable to load saved tasks:", error);
      }
    }

    setTasksLoaded(true);
  }, []);

  // Save tasks whenever they change
  useEffect(() => {
    if (tasksLoaded) {
      localStorage.setItem("ravd-tasks", JSON.stringify(tasks));
    }
  }, [tasks, tasksLoaded]);

  // Add a new task
  const addTask = (title, description = "", priority = "Medium") => {
    const newTask = {
      id: Date.now(),
      title,
      description,
      completed: false,
      priority,
    };

    setTasks((previousTasks) => [...previousTasks, newTask]);
  };

  // Edit a task
  const editTask = (id, updatedData) => {
    setTasks((previousTasks) =>
      previousTasks.map((task) =>
        task.id === id && !task.completed
          ? { ...task, ...updatedData }
          : task
      )
    );
  };

  // Delete a task
  const deleteTask = (id) => {
    setTasks((previousTasks) =>
      previousTasks.filter((task) => task.id !== id)
    );
  };

  // Mark task as completed or pending
  const toggleTask = (id) => {
    setTasks((previousTasks) =>
      previousTasks.map((task) =>
        task.id === id
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        addTask,
        editTask,
        deleteTask,
        toggleTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

// Access task functions from any component
export const useTasks = () => {
  return useContext(TaskContext);
};
