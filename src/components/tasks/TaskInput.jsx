import React, { useState } from "react";
import { Button } from "@/components/ui/button";

const TaskInput = ({ newTask, setNewTask, addTask }) => {
  const [error, setError] = useState("");

  const handleAddTask = () => {
    if (!newTask.trim()) {
      setError("Task cannot be empty");
      return;
    }
    addTask(newTask);
    setNewTask("");
    setError("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleAddTask();
  };

  return (
    <div className="mt-4 flex gap-2 sm:gap-3 flex-col sm:flex-row mb-5 items-start">
      <div className="flex-1 relative w-full">
        <div className="relative">
          <div
            className={`
              flex items-center gap-3 px-4 py-3 rounded-lg transition-all
              bg-white border ${error ? "border-red-500" : "border-slate-200"}
              shadow-sm dark:bg-slate-800/30 dark:border-slate-700/50
              focus-within:border-teal-400 dark:focus-within:border-teal-400/50
            `}
          >
            <span className="text-slate-400 dark:text-slate-500 font-medium text-lg">+</span>

            <input
              type="text"
              placeholder="Add new task"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-1 outline-none text-sm text-slate-700 placeholder-slate-400 dark:bg-transparent dark:text-white dark:placeholder-slate-500"
            />
          </div>

          {/* Floating Animated Error */}
          {error && (
            <p className="absolute -top-5 left-2 text-red-500 text-xs italic animate-fade-in">
              {error}
            </p>
          )}
        </div>
      </div>

      <Button
        onClick={handleAddTask}
        className="bg-teal-500! hover:bg-teal-600! text-white px-4! py-2! rounded-lg font-semibold text-sm w-full sm:w-auto! h-13"
      >
        Add Task
      </Button>
    </div>
  );
};

export default TaskInput;



// import React from "react";
// import { Button } from "@/components/ui/button";

// const TaskInput = ({ newTask, setNewTask, addTask }) => {
//   const handleAddTask = () => {
//     if (!newTask.trim()) return; // Prevent empty task
//     addTask(newTask);
//     setNewTask("");
//   };

//   const handleKeyPress = (e) => {
//     if (e.key === "Enter") handleAddTask();
//   };

//   return (
//     <div className="mt-4 flex gap-2 sm:gap-3 flex-col sm:flex-row mb-5">
//       <div className="flex-1 relative w-full">
//         <div className="flex items-center gap-3 border border-slate-700/50 rounded-lg bg-slate-800/30 px-4 py-3 focus-within:border-teal-400/50 transition-colors">
//           <span className="text-slate-500">+</span>
//           <input
//             type="text"
//             placeholder="Add new task"
//             value={newTask}
//             onChange={(e) => setNewTask(e.target.value)}
//             onKeyPress={handleKeyPress}
//             className="flex-1 bg-transparent outline-none placeholder-slate-500 text-white text-sm"
//           />
//         </div>
//       </div>

//       <Button
//         onClick={handleAddTask}
//         className="bg-teal-500! hover:bg-teal-600! text-white px-4! py-2! rounded-lg font-semibold text-sm w-full sm:w-auto! h-12"
//       >
//         Add Task
//       </Button>
//     </div>
//   );
// };

// export default TaskInput;
