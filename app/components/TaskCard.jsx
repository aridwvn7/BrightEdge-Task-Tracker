
"use client";

import { useState } from "react";
import {
  CheckCircle2,
  Circle,
  Pencil,
  Trash2,
  Save,
  X,
} from "lucide-react";
import { useTasks } from "../context/TaskContext";

const TaskCard = ({ task }) => {
  const { editTask, deleteTask, toggleTask } = useTasks();

  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [editDescription, setEditDescription] = useState(
    task.description || ""
  );
  const [editPriority, setEditPriority] = useState(
    task.priority || "Medium"
  );

  const priorityStyles = {
    High: "bg-red-100 text-red-700",
    Medium: "bg-amber-100 text-amber-700",
    Low: "bg-green-100 text-green-700",
  };
  const handleSave = () => {
    if (!editTitle.trim() || task.completed) return;

    editTask(task.id, {
      title: editTitle.trim(),
      description: editDescription.trim(),
      priority: editPriority,
    });

    setIsEditing(false);
  };

  return (
    <div className="task-animate group rounded-2xl border border-white/80 bg-white/90
     p-5 shadow-md shadow-green-900/5 backdrop-blur-sm transition-all
      duration-300 hover:-translate-y-1 hover:border-green-200
       hover:shadow-xl hover:shadow-green-900/10">
      <div className="flex items-start gap-3">
        <button
          onClick={() => toggleTask(task.id)}
          title={task.completed ? "Mark as pending" : "Mark as completed"}
          className={`mt-1 shrink-0 transition-colors duration-200 ${task.completed
              ? "text-green-600"
              : "text-slate-400 hover:text-green-600"
            }`}
        >
          {task.completed ? (
            <CheckCircle2 size={22} />
          ) : (
            <Circle size={22} />
          )}
        </button>

        <div className="min-w-0 flex-1">
          {isEditing && !task.completed ? (
            <div className="space-y-3">
              <input
                value={editTitle}
                onChange={(event) => setEditTitle(event.target.value)}
                placeholder="Task title"
                className="w-full rounded-lg border border-slate-200 px-3 py-2
                 text-sm outline-none focus:border-green-500"
              />

              <textarea
                value={editDescription}
                onChange={(event) =>
                  setEditDescription(event.target.value)
                }
                placeholder="Task description"
                rows={2}
                className="w-full resize-none rounded-lg border border-slate-200 
                px-3 py-2 text-sm outline-none focus:border-green-500"
              />

              <select
                value={editPriority}
                onChange={(event) =>
                  setEditPriority(event.target.value)
                }
                className="w-full rounded-lg border border-slate-200 px-3 py-2 
                text-sm outline-none focus:border-green-500"
              >
                <option value="High">High Priority</option>
                <option value="Medium">Medium Priority</option>
                <option value="Low">Low Priority</option>
              </select>

              <div className="flex gap-2">
                <button
                  onClick={handleSave}
                  disabled={!editTitle.trim()}
                  className="flex items-center gap-2 rounded-lg bg-green-600 px-3 py-2
                   text-sm text-white hover:bg-green-700 disabled:opacity-50"
                >
                  <Save size={16} />
                  Save
                </button>

                <button
                  onClick={() => setIsEditing(false)}
                  className="flex items-center gap-2 rounded-lg border border-slate-200
                   px-3 py-2 text-sm text-slate-600 hover:bg-slate-50"
                >
                  <X size={16} />
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <>
              <p
                className={`break-words font-semibold ${task.completed
                  ? "text-slate-400 line-through"
                  : "text-slate-800"
                  }`}
              >
                {task.title}
              </p>

              {task.description && (
                <p className="mt-1 break-words text-sm text-slate-500">
                  {task.description}
                </p>
              )}

              {/* TASK PIORITY */}

              <div className="mt-3 flex flex-wrap items-center gap-3">
                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${priorityStyles[task.priority] ||
                    priorityStyles.Medium
                    }`}
                >
                  {task.priority || "Medium"} Priority
                </span>

                <span
                  className={`rounded-full px-3 py-1 text-xs font-medium ${task.completed
                    ? "bg-green-100 text-green-700"
                    : "bg-orange-100 text-orange-700"
                    }`}
                >
                  {task.completed ? "Completed" : "Pending"}
                </span>
              </div>
            </>
          )}
        </div>

        {/* COMPLETE TASK */}

        <div className="flex shrink-0 items-center gap-1">
          {!task.completed && !isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              title="Edit task"
              aria-label="Edit task"
              className="rounded-lg p-2 text-slate-400 transition hover:bg-green-50
               hover:text-green-600"
            >
              <Pencil size={18} />
            </button>
          )}

          {/* DELETE TASK */}

          <button
            onClick={() => deleteTask(task.id)}
            title="Delete task"
            aria-label="Delete task"
            className="rounded-lg p-2 text-slate-400 transition hover:bg-red-50 hover:text-red-600"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
