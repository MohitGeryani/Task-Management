import React from "react";
import { Trash2 } from "lucide-react";
import { Button } from "../ui/button";

const TaskItem = ({ task, deleteTask, updateTaskStatus }) => {
  return (
    <div
      className="
        w-full
  border border-slate-300 
  rounded-xl 
  bg-white 
  p-4 
  mb-3
  shadow-[0_4px_12px_rgba(0,0,0,0.06)]
  hover:shadow-[0_6px_18px_rgba(0,0,0,0.1)]
  hover:bg-slate-50 
  transition-all 
  duration-200
  flex 
  items-start 
  gap-4
  dark:border-slate-700/40
  dark:bg-slate-900/60 
  dark:shadow-black/20
  dark:hover:bg-slate-900/80
      "
    >
      {/* Task Text */}
      <span className="
  flex-1 
  text-base 
  text-slate-800 
  leading-relaxed 
  break-words
  dark:text-white
">
        {task.text}
      </span>

      {/* Mark as Complete */}
      {task.status !== "completed" && (
        <button
          onClick={() => updateTaskStatus(task.id, "completed")}
         className="
  text-teal-600 
  hover:text-teal-700 
  text-lg mt-1
  dark:text-teal-400 
  dark:hover:text-teal-300
"

        >
          ✓
        </button>
      )}

      {/* Delete Button */}
      <button
        onClick={() => deleteTask(task.id)}
       className="  
  p-2 
  text-slate-400 
  hover:text-red-500 
  hover:bg-red-50 
  rounded 
  transition-colors
  dark:hover:bg-slate-800
"

      >
        <Trash2 className="w-5 h-5" />
      </button>
    </div>
  );
};

export default TaskItem;
