
"use client";

import { useTasks } from "../context/TaskContext";
import TaskCard from "./TaskCard";

const TaskList = ({ searchTerm, activeFilter }) => {
  const { tasks } = useTasks();

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (task.description || "")
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

    const matchesFilter =
      activeFilter === "All" ||
      (activeFilter === "Pending" && !task.completed) ||
      (activeFilter === "Completed" && task.completed);

    return matchesSearch && matchesFilter;
  });

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-slate-800">
          Your Tasks
        </h2>

        <span className="text-sm text-slate-500">
          {filteredTasks.length}{" "}
          {filteredTasks.length === 1 ? "task" : "tasks"}
        </span>
      </div>

      {filteredTasks.length > 0 ? (
        <div className="space-y-3">
          {filteredTasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-green-200 bg-white/70 px-6 py-16 text-center shadow-sm backdrop-blur-sm">
  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-3xl">
    📝
  </div>

  <h3 className="font-bold text-slate-800">
    No tasks found
  </h3>

  <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-slate-500">
    Your task list is looking a little empty. Add a new task or adjust your search and filters to get started.
  </p>
</div>
      )}
    </section>
  );
};

export default TaskList;
