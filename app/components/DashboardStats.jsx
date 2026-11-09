
"use client";

import { ListTodo, Clock, CheckCircle2, TrendingUp } from "lucide-react";
import { useTasks } from "../context/TaskContext";
import StatCard from "./StatCard";

const DashboardStats = () => {
  const { tasks } = useTasks();

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((task) => task.completed).length;
  const pendingTasks = tasks.filter((task) => !task.completed).length;

  const completionRate =
    totalTasks === 0
      ? 0
      : Math.round((completedTasks / totalTasks) * 100);

  const statistics = [
    {
      title: "Total Tasks",
      value: totalTasks,
      icon: ListTodo,
      iconColor: "text-blue-600",
      iconBg: "bg-blue-50",
    },
    {
      title: "Pending Tasks",
      value: pendingTasks,
      icon: Clock,
      iconColor: "text-orange-600",
      iconBg: "bg-orange-50",
    },
    {
      title: "Completed Tasks",
      value: completedTasks,
      icon: CheckCircle2,
      iconColor: "text-green-600",
      iconBg: "bg-green-50",
    },
    {
      title: "Completion Rate",
      value: `${completionRate}%`,
      icon: TrendingUp,
      iconColor: "text-purple-600",
      iconBg: "bg-purple-50",
    },
  ];

  return (
    <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {statistics.map((stat) => (
        <StatCard key={stat.title} {...stat} />
      ))}
    </section>
  );
};

export default DashboardStats;
