import React from "react";
import { Trash2 } from "lucide-react";

const TaskItem = ({ task, deleteTask, updateTaskStatus }) => {
  return (
    <div
      className="
        w-full
        border border-slate-700/40 
        rounded-xl 
        bg-slate-900/60 
        backdrop-blur-md 
        p-4 
        mb-3
        shadow-lg shadow-black/20
        hover:shadow-teal-500/10
        hover:bg-slate-900/80 
        transition-all 
        duration-200
        flex 
        items-start 
        gap-4
      "
    >
      {/* Task Text */}
      <span className="flex-1 text-base text-white leading-relaxed break-words">
        {task.text}
      </span>

      {/* Mark as Complete */}
      {task.status !== "completed" && (
        <button
          onClick={() => updateTaskStatus(task.id, "completed")}
          className="text-teal-400 hover:text-teal-300 text-lg"
        >
          ✓
        </button>
      )}

      {/* Delete Button */}
      <button
        onClick={() => deleteTask(task.id)}
        className="p-2 text-slate-400 hover:text-red-400 hover:bg-slate-800 rounded transition-colors"
      >
        <Trash2 className="w-5 h-5" />
      </button>
    </div>
  );
};

export default TaskItem;
