
"use client";

import { useState } from "react";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import DashboardStats from "./components/DashboardStats";
import TaskForm from "./components/TaskForm";
import TaskSearch from "./components/TaskSearch";
import TaskFilters from "./components/TaskFilters";
import TaskList from "./components/TaskList";
import Footer from "./components/Footer";

export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-100">
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
      />

      <div className="flex min-w-0 flex-1 flex-col">
        <Header onMenuClick={() => setSidebarOpen(true)} />

        <main className="mx-auto w-full max-w-7xl flex-1 space-y-8 p-4 sm:p-5 md:p-8">
          <DashboardStats />

          <div className="grid grid-cols-1 items-start gap-8 xl:grid-cols-3">
            <div className="xl:col-span-1">
              <TaskForm />
            </div>

            <div className="space-y-5 xl:col-span-2">
              <TaskSearch
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
              />

              <TaskFilters
                activeFilter={activeFilter}
                onFilterChange={setActiveFilter}
              />

              <TaskList
                searchTerm={searchTerm}
                activeFilter={activeFilter}
              />
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
}
