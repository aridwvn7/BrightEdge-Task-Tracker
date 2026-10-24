
"use client";

import { useEffect, useState } from "react";
import {
    LayoutDashboard,
    CheckSquare,
    Clock,
    CheckCircle,
    Plus,
    Search,
    Bell,
    Menu,
    Trash,
    X
} from "lucide-react";

export default function Home() {
    const [activeFilter, setActiveFilter] = useState("All Tasks");
    const [tasks, setTasks] = useState([]);
    const [taskTitle, setTaskTitle] = useState("");
    const [taskDescription, setTaskDescription] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [tasksLoaded, setTasksLoaded] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(false);

    // USE EFFECT
    useEffect(() => {
        try {
            const savedTasks = localStorage.getItem("ravd-tasks");

            if (savedTasks) {
                setTasks(JSON.parse(savedTasks));
            }
        } catch (error) {
            console.error("Failed to load tasks:", error);
        } finally {
            setTasksLoaded(true);
        }
    }, []);

    useEffect(() => {
        if (!tasksLoaded) return;

        localStorage.setItem("ravd-tasks", JSON.stringify(tasks));
    }, [tasks, tasksLoaded]);

    // ADD TASK

    const addTask = () => {
        if (taskTitle.trim() === "") {
            return;
        }

        const newTask = {
            id: Date.now(),
            title: taskTitle,
            description: taskDescription,
            completed: false,
        };

        setTasks([...tasks, newTask]);
        setTaskTitle("");
        setTaskDescription("");
    };

    return (
        <main className="min-h-screen bg-slate-50 text-slate-900">
            <div className="flex min-h-screen">

                {/* Sidebar */}


                {sidebarOpen && (
                    <div
                        onClick={() => setSidebarOpen(false)}
                        className="fixed inset-0 z-30 bg-black/40 md:hidden"
                        aria-hidden="true"
                    />
                )}




                <aside className={`${sidebarOpen ? "block" : "hidden"
                    } absolute left-0 top-0 z-40 h-full w-64 border-r border-slate-200 bg-white p-6 md:relative md:block`}>

                    {/* CLOSING X SIDEBAR */}
                    <button
                        onClick={() => setSidebarOpen(false)}
                        className="absolute right-4 top-4 rounded-lg p-2 text-slate-500 hover:bg-slate-100 md:hidden"
                        aria-label="Close sidebar"
                    >
                        <X size={20} />
                    </button>

                    <h1 className="text-2xl font-bold text-green-600">
                        BrightEdge<span className="text-slate-900">.</span>
                    </h1>

                    <p className="mb-10 mt-2 text-sm text-slate-500">
                        Task Management
                    </p>

                    <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
                        Workspace
                    </p>

                    <nav className="space-y-2">
                        {[
                            { name: "All Tasks", icon: LayoutDashboard },
                            { name: "Pending", icon: Clock },
                            { name: "Completed", icon: CheckCircle },
                        ].map((item) => {
                            const Icon = item.icon;

                            return (
                                <button
                                    key={item.name}
                                    onClick={() => {
                                        setActiveFilter(item.name);
                                        setSidebarOpen(false);
                                    }}
                                    className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${activeFilter === item.name
                                        ? "bg-green-50 text-green-600"
                                        : "text-slate-600 hover:bg-green-50"
                                        }`}
                                >
                                    <Icon size={19} />
                                    {item.name}
                                </button>
                            );
                        })}
                    </nav>
                </aside>

                {/* Main content */}
                <section className="min-w-0 flex-1 p-5 sm:p-8 lg:p-10">
                    <header className="mb-10 flex items-center justify-between gap-4">
                        <div>
                            <p className="text-sm text-slate-500">
                                Welcome back
                            </p>

                            <h2 className="mt-1 text-2xl font-bold sm:text-3xl">
                                Task Management
                            </h2>

                            <p className="mt-2 text-sm text-slate-500">
                                Organize your work and stay on top of your tasks.
                            </p>
                        </div>

                        {/* MOBILE MENU/ HAMBURGER */}
                        <button
                            onClick={() => setSidebarOpen(!sidebarOpen)}
                            className="rounded-xl bg-green-600 p-3 text-white hover:bg-green-700 md:hidden"
                            aria-label="Toggle sidebar"
                        >
                            <Menu size={21} />
                        </button>


                        <button
                            onClick={addTask}
                            className="hidden items-center gap-2 rounded-xl bg-green-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-green-700 sm:flex"
                        >
                            <Plus size={18} />
                            Add New Task
                        </button>

                    </header>

                    {/* TASK LIST INPUT */}

                    <div className="mb-6">
                        <input
                            type="text"
                            value={taskTitle}
                            onChange={(event) => setTaskTitle(event.target.value)}
                            placeholder="Enter a task title..."
                            className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 outline-none focus:border-green-600"
                        />
                        <textarea
                            value={taskDescription}
                            onChange={(event) => setTaskDescription(event.target.value)}
                            placeholder="Add a description (optional)..."
                            rows={2}
                            className="mt-3 w-full rounded-lg border border-slate-300 bg-white px-4 py-3 outline-none focus:border-green-600"
                        />

                        <p className="mb-6 text-sm text-slate-500">
                            Current title: {taskTitle || "Nothing typed yet"}
                        </p>

                    </div>

                    {/* Statistics */}
                    <div className="mb-8 grid grid-cols-1 gap-5 sm:grid-cols-3">
                        <StatCard
                            title="Total Tasks"
                            value={tasks.length}
                            icon={CheckSquare}
                            color="bg-green-50 text-green-600"
                        />

                        <StatCard
                            title="Pending Tasks"
                            value={tasks.filter((task) => !task.completed).length}
                            icon={Clock}
                            color="bg-orange-50 text-orange-600"
                        />

                        <StatCard
                            title="Completed Tasks"
                            value={tasks.filter((task) => task.completed).length}
                            icon={CheckCircle}
                            color="bg-green-50 text-green-600"
                        />
                    </div>

                    {/* Task list container */}
                    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
                        <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                            <div>
                                <h3 className="text-lg font-bold">My Tasks</h3>
                                <p className="mt-1 text-sm text-slate-500">
                                    Manage your daily activities.
                                </p>
                            </div>


                            <div className="flex items-center gap-2 rounded-xl border border-slate-200 px-3 py-2">
                                <Search size={18} className="shrink-0 text-slate-400" />

                                <input
                                    type="text"
                                    placeholder="Search tasks..."
                                    value={searchTerm}
                                    onChange={(event) => setSearchTerm(event.target.value)}
                                    className="w-full text-sm outline-none sm:w-40"
                                />

                                {searchTerm.length > 0 && (
                                    <button
                                        type="button"
                                        onClick={() => setSearchTerm("")}
                                        title="Clear search"
                                        aria-label="Clear search"
                                        className="shrink-0 cursor-pointer text-slate-400 transition hover:text-red-500"
                                    >
                                        <X size={16} />
                                    </button>
                                )}
                            </div>


                        </div>

                        <div className="mb-6 flex gap-2 overflow-x-auto border-b border-slate-200 pb-3">
                            {["All Tasks", "Pending", "Completed"].map((filter) => (
                                <button
                                    key={filter}
                                    onClick={() => setActiveFilter(filter)}
                                    className={`whitespace-nowrap rounded-lg px-4 py-2 text-sm font-medium transition ${activeFilter === filter
                                        ? "bg-green-50 text-green-600"
                                        : "text-slate-500 hover:bg-slate-50"
                                        }`}
                                >
                                    {filter}
                                </button>
                            ))}
                        </div>


                        <div className="space-y-4">
                            {tasks.length === 0 ? (
                                <div className="rounded-xl border border-dashed border-slate-300 bg-white p-10 text-center">
                                    <CheckSquare className="mx-auto mb-3 text-slate-400" size={36} />
                                    <h3 className="text-lg font-semibold text-slate-700">
                                        No tasks yet
                                    </h3>
                                    <p className="mt-1 text-sm text-slate-500">
                                        Add your first task to get started.
                                    </p>
                                </div>
                            ) : (
                                tasks
                                    .filter((task) => {
                                        const matchesFilter =
                                            activeFilter === "All Tasks" ||
                                            (activeFilter === "Pending" && !task.completed) ||
                                            (activeFilter === "Completed" && task.completed);

                                        const matchesSearch = task.title
                                            .toLowerCase()
                                            .includes(searchTerm.toLowerCase());

                                        return matchesFilter && matchesSearch;
                                    })
                                    .map((task) => (
                                        <div
                                            key={task.id}
                                            className={`flex items-center gap-3 rounded-xl border p-4 transition ${task.completed
                                                ? "border-green-200 bg-green-50/50"
                                                : "border-slate-200 bg-white hover:border-green-300 hover:shadow-sm"
                                                }`}
                                        >


                                            {/* <button
                        onClick={() =>
                          setTasks(
                            tasks.map((item) =>
                              item.id === task.id
                                ? { ...item, completed: !item.completed }
                                : item
                            )
                          )
                        }
                        className={`flex h-5 w-5 shrink-0 items-center justify-center rounded border ${task.completed
                            ? "border-green-600 bg-green-600 text-white"
                            : "border-slate-300 hover:border-green-600"
                          }`}
                      >
                        {task.completed && <CheckCircle size={14} />}
                      </button> */}


                                            <div className="flex-1">
                                                <p
                                                    className={`font-semibold ${task.completed
                                                        ? "text-slate-400 line-through"
                                                        : "text-slate-800"
                                                        }`}
                                                >
                                                    {task.title}
                                                </p>
                                                {task.description && (
                                                    <p className="mt-1 text-sm text-slate-500">
                                                        {task.description}
                                                    </p>
                                                )}
                                                <p className="mt-1 text-sm text-slate-500">
                                                    {task.completed ? "Completed" : "Pending"}
                                                </p>
                                            </div>

                                            {/* COMPLETE/ UNDO BUTTON */}

                                            <button
                                                onClick={() =>
                                                    setTasks(
                                                        tasks.map((item) =>
                                                            item.id === task.id
                                                                ? { ...item, completed: !item.completed }
                                                                : item
                                                        )
                                                    )
                                                }
                                                title={task.completed ? "Mark as pending" : "Mark as completed"}
                                                className={`rounded-lg p-2 transition ${task.completed
                                                    ? "text-green-600 hover:bg-green-100"
                                                    : "text-slate-400 hover:bg-green-50 hover:text-green-600"
                                                    }`}
                                            >
                                                <CheckCircle size={21} />
                                            </button>


                                            {/* DELETE BUTTON */}

                                            <button
                                                onClick={() =>
                                                    setTasks(tasks.filter((item) => item.id !== task.id))
                                                }
                                                title="Delete task"
                                                className="rounded-lg p-2 text-slate-400 transition hover:bg-red-50 hover:text-red-600"
                                            >
                                                <Trash size={20} />
                                            </button>


                                        </div>
                                    ))
                            )}
                        </div>

                    </div>
                </section>
            </div>
        </main>
    );
}

function StatCard({ title, value, icon: Icon, color }) {
    return (
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-slate-500">{title}</p>

                <div className={`rounded-xl p-3 ${color}`}>
                    <Icon size={21} />
                </div>
            </div>

            <p className="mt-5 text-3xl font-bold">{value}</p>
        </div>
    );
}



