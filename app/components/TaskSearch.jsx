
"use client";

import { Search, X } from "lucide-react";

const TaskSearch = ({ searchTerm, onSearchChange }) => {
  return (
    <div className="relative w-full">
      <Search
        size={19}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
      />

      <input
        type="text"
        value={searchTerm}
        onChange={(event) => onSearchChange(event.target.value)}
        placeholder="Search your tasks..."
        className="w-full rounded-xl border border-green-100 bg-white/90 py-3 pl-11 pr-12 text-slate-800 shadow-sm outline-none transition focus:border-green-400 focus:ring-4 focus:ring-green-100"
      />

      {searchTerm && (
        <button
          type="button"
          onClick={() => onSearchChange("")}
          aria-label="Clear search"
          className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
        >
          <X size={18} />
        </button>
      )}
    </div>
  );
};

export default TaskSearch;
