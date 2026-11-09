
import { TaskProvider } from "./context/TaskContext";
import "./globals.css";

export const metadata = {
  title: "Task Management Dashboard",
  description: "A responsive task management dashboard built with Next.js.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="flex min-h-full flex-col">
        <TaskProvider>
          {children}
        </TaskProvider>
      </body>
    </html>
  );
}
