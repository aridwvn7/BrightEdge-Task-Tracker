
"use client";

import {
  LayoutDashboard,
  ListTodo,
  Clock,
  CheckCircle2,
  X,
} from "lucide-react";

const Sidebar = ({
  isOpen,
  onClose,
  activeFilter,
  onFilterChange,
}) => {
  const navigation = [
    { name: "All Tasks", value: "All", icon: LayoutDashboard },
    { name: "Pending", value: "Pending", icon: Clock },
    { name: "Completed", value: "Completed", icon: CheckCircle2 },
  ];

  return (
    <>
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-slate-200 bg-white p-5 transition-transform duration-300 lg:static lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="mb-10 flex items-center justify-between">
          <h2 className="text-2xl font-extrabold text-slate-800">
            BrightEdge<span className="text-green-600">.</span>
          </h2>

          <button
            onClick={onClose}
            className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 lg:hidden"
            aria-label="Close sidebar"
          >
            <X size={20} />
          </button>
        </div>

        <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-slate-400">
          Workspace
        </p>

        <nav className="space-y-2">
          {navigation.map((item) => {
            const Icon = item.icon;
            const isActive = activeFilter === item.value;

            return (
              <button
                key={item.value}
                onClick={() => {
                  onFilterChange(item.value);
                  onClose();
                }}
                className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
                  isActive
                    ? "bg-green-50 text-green-700"
                    : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                <Icon size={19} />
                {item.name}
              </button>
            );
          })}
        </nav>

        <div className="mt-auto rounded-2xl bg-green-50 p-4">
          <ListTodo size={24} className="mb-3 text-green-600" />

          <p className="font-semibold text-slate-800">
            Stay productive!
          </p>

          <p className="mt-1 text-xs leading-5 text-slate-500">
            Keep organizing your tasks and make every day count.
          </p>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
