import React, { useState, useEffect } from "react";
import { Trash2 } from "lucide-react";

const TaskItem = ({ task, deleteTask, updateTaskStatus }) => {
  const [isAnimating, setIsAnimating] = useState(true);
  const [isCompleting, setIsCompleting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleComplete = () => {
    setIsCompleting(true);
    setTimeout(() => updateTaskStatus(task.id, "completed"), 300);
  };

  const handleDelete = () => {
    setIsDeleting(true);
    setTimeout(() => deleteTask(task.id), 300); // wait for animation before removing
  };

  useEffect(() => {
    const timer = setTimeout(() => setIsAnimating(false), 300); // stop initial animation
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`
        w-full border border-slate-300 rounded-xl bg-white p-4 mb-3
        shadow-[0_4px_12px_rgba(0,0,0,0.06)] hover:shadow-[0_6px_18px_rgba(0,0,0,0.1)]
        hover:bg-slate-50 transition-all duration-200 flex items-start gap-4
        dark:border-slate-700/40 dark:bg-slate-900/60 dark:shadow-black/20 dark:hover:bg-slate-900/80
        transform transition-transform duration-300
        ${isAnimating ? "animate-slide-in" : ""}
        ${isCompleting ? "scale-95 opacity-50 translate-x-4" : ""}
        ${isDeleting ? "scale-90 opacity-0 -translate-x-4" : ""}
      `}
    >
      <span className="flex-1 text-base text-slate-800 leading-relaxed break-words dark:text-white">
        {task.text}
      </span>

      {task.status !== "completed" && (
        <button
          onClick={handleComplete}
          className="text-teal-600 hover:text-teal-700 text-lg mt-1 dark:text-teal-400 dark:hover:text-teal-300 transition-transform duration-300"
        >
          ✓
        </button>
      )}

      <button
        onClick={handleDelete}
        className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded transition-colors dark:hover:bg-slate-800"
      >
        <Trash2 className="w-5 h-5" />
      </button>
    </div>
  );
};

export default TaskItem;
