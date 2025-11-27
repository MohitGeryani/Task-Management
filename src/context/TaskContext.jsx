import { useLocalStorage } from "@/Hooks/useLocalStorage";
import React, { createContext, useContext, useCallback, useMemo } from "react";


const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useLocalStorage("tasks-board", [
    { id: 1, text: "Update menu with new seasonal dishes", status: "new" },
    { id: 2, text: "Conduct staff training", status: "in-progress" },
    { id: 3, text: "Review supplier contracts", status: "pending" },
    { id: 4, text: "Plan weekend promotions", status: "new" },
  ]);

  const addTask = useCallback(
    (text, status = "new") => {
      if (!text.trim()) return;

      setTasks((prev) => [
        ...prev,
        { id: Date.now(), text, status },
      ]);
    },
    [setTasks]
  );

  const deleteTask = useCallback(
    (id) => {
      setTasks((prev) => prev.filter((task) => task.id !== id));
    },
    [setTasks]
  );

  const updateTaskStatus = useCallback(
    (id, newStatus) => {
      setTasks((prev) =>
        prev.map((t) =>
          t.id === id ? { ...t, status: newStatus } : t
        )
      );
    },
    [setTasks]
  );

  // 🧠 Only re-render context when tasks actually change
  const value = useMemo(
    () => ({
      tasks,
      addTask,
      deleteTask,
      updateTaskStatus,
    }),
    [tasks, addTask, deleteTask, updateTaskStatus]
  );

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};

export const useTasks = () => useContext(TaskContext);
