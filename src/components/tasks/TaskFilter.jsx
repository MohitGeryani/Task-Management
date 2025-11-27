import React from "react";

const TaskFilter = ({ filter, setFilter }) => {
  const tabs = ["all", "completed", "pending"];

  return (
    <div className="mt-3 flex md:justify-center! items-center md:text-1xl  md:gap-6  border-b border-slate-700/50 pb-3 overflow-x-auto no-scrollbar text-sm">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => setFilter(tab)}
          className="flex-shrink-0 relative bg-transparent! outline-none! border-none! capitalize font-medium md:text-sm text-base pb-2  text-slate-400 hover:text-slate-300"
        >
          {/* Label */}
          <span className={filter === tab ? "text-white" : ""}>{tab}</span>

          {/* Underline (shows only when selected) */}
          {filter === tab && (
            <span className="absolute left-0 right-0 -bottom-[3px] mx-auto h-[2px] w-full bg-white rounded-full transition-all"></span>
          )}
        </button>
      ))}
    </div>
  );
};

export default TaskFilter;
