
"use client";

const TaskFilters = ({ activeFilter, onFilterChange }) => {
  const filters = ["All", "Pending", "Completed"];

  return (
    <div className="flex flex-wrap items-center gap-2">
      {filters.map((filter) => (
        <button
          key={filter}
          onClick={() => onFilterChange(filter)}
          className={`rounded-xl px-4 py-2.5 text-sm font-medium transition ${activeFilter === filter
              ? "bg-green-600 text-white shadow-md shadow-green-600/20"
              : "bg-white/80 text-slate-600 hover:bg-green-50 hover:text-green-700"
            }`}
        >
          {filter === "All" ? "All Tasks" : filter}
        </button>
      ))}
    </div>
  );
};

export default TaskFilters;
