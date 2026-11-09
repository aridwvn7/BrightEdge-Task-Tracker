
"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { useTasks } from "../context/TaskContext";
import TaskPriority from "./TaskPriority";

const TaskForm = () => {
  const { addTask } = useTasks();

  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskPriority, setTaskPriority] = useState("Medium");

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!taskTitle.trim()) return;

    addTask(
      taskTitle.trim(),
      taskDescription.trim(),
      taskPriority
    );

    setTaskTitle("");
    setTaskDescription("");
    setTaskPriority("Medium");
  };

  return (
    <section className="rounded-2xl border border-white/80 bg-white/95 p-6 shadow-lg shadow-green-900/10 backdrop-blur-sm">
      <div className="mb-6">
        <h2 className="text-lg font-bold text-slate-800">
          Add New Task
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Create a task and organize your work.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Task Title
          </label>

          <input
            type="text"
            value={taskTitle}
            onChange={(event) => setTaskTitle(event.target.value)}
            placeholder="Enter your task title"
            className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-800 placeholder:text-slate-400 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Description
          </label>

          <textarea
            value={taskDescription}
            onChange={(event) => setTaskDescription(event.target.value)}
            placeholder="Describe your task..."
            rows={3}
            className="w-full resize-none rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-800 placeholder:text-slate-400 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
            />
        </div>

        <TaskPriority
          value={taskPriority}
          onChange={setTaskPriority}
        />

        <button
          type="submit"
          disabled={!taskTitle.trim()}
          className="flex items-center justify-center gap-2 rounded-xl bg-green-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Plus size={18} />
          Add Task
        </button>
      </form>
    </section>
  );
};

export default TaskForm;
