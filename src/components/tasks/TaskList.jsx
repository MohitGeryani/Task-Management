import React from "react";
import TaskItem from "./TaskItem";

const TaskList = ({ tasks, toggleTask, deleteTask }) => {
  return (
<div className="space-y-2 sm:space-y-3">

      {tasks.length > 0 ? (
        tasks.map((task) => (
          <TaskItem key={task.id} task={task} toggleTask={toggleTask} deleteTask={deleteTask} />
        ))
      ) : (
        <div className="text-center py-12 text-slate-400">
     <p className="text-sm sm:text-base text-slate-400">No tasks found</p>

        </div>
      )}
    </div>
  );
};

export default TaskList;
