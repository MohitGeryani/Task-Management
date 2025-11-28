import React, { useMemo, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { DockIcon, Search, Plus } from "lucide-react";
import { useTasks } from "@/context/TaskContext";
import TaskItem from './TaskItem';
import TaskInput from "./TaskInput";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"; 
import { Filter } from "lucide-react"; 
import { useLocalStorage } from "@/Hooks/useLocalStorage";
import { Button } from "../ui/button";


const columns = [
  { id: "new", name: "New" },
  { id: "in-progress", name: "In Progress" },
  { id: "pending", name: "Pending" },
  { id: "completed", name: "Completed" },
];

const TaskWindow = () => {
  const { tasks, updateTaskStatus, deleteTask, addTask } = useTasks();
  const [newTask, setNewTask] = useState("");
    const [visibleColumns, setVisibleColumns] = useLocalStorage(
  "visibleColumns",
  columns.map(col => col.id) // default: all columns visible
);

const [searchQuery, setSearchQuery] = useState("");
const tasksByColumn = useMemo(() => {
  const grouped = {};
  columns.forEach(col => {
    grouped[col.id] = tasks
      .filter(t => t.status === col.id)
      .filter(t => t.text.toLowerCase().includes(searchQuery.toLowerCase())); // filter by search
  });
  return grouped;
}, [tasks, searchQuery]);


  const handleDragEnd = (result) => {
    const { destination, source, draggableId } = result;
    if (!destination) return;

    if (destination.droppableId !== source.droppableId) {
      updateTaskStatus(Number(draggableId), destination.droppableId);
    }
  };
const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
   
    <div className="w-[90%]   bg-[#fdfdfd] dark:bg-transparent
border border-slate-200 dark:border-none
dark:shadow-inner rounded-none md:rounded-3xl p-4 sm:p-6 shadow-inner ">

      {/* Header */}
     <div
  className="border rounded-2xl bg-slate-900/40 backdrop-blur-md p-6 mb-6 
             flex justify-between items-center shadow-lg bg-white dark:bg-slate-900/40
             border border-slate-200 dark:border-slate-700/50 dark:shadow-lg relative"
>

  {/* LEFT SIDE — hidden when search is open */}
  <div
    className={`flex items-center gap-4 transition-all duration-300 ${
      isSearchOpen ? "opacity-0 pointer-events-none" : "opacity-100"
    }`}
  >
    <div className="bg-teal-50 dark:bg-teal-500/10 border-teal-200 dark:border-teal-500/20">
      <DockIcon className="text-teal-400 w-6 h-6" />
    </div>

    <div>
      <h1 className="text-xs! sm:text-2xl font-bold text-black dark:text-white tracking-tight">
        Task Manager
      </h1>
      <p className="text-xs text-slate-400 font-medium">Restaurant Operations</p>
    </div>
  </div>

  {/* RIGHT — SEARCH ICON (hidden when search opened) */}
  <button
    onClick={() => setIsSearchOpen(true)}
    className={`p-2 transition-all duration-300 ${
      isSearchOpen ? "opacity-0 pointer-events-none" : "opacity-100"
    }`}
  >
    <Search className="w-5 h-5 text-slate-400 hover:text-teal-400 transition-colors" />
  </button>

  {/* FULL SEARCH BAR MODE */}
  <div
    className={`absolute inset-0 flex items-center gap-3 px-6 transition-all duration-300
                ${isSearchOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
  >
    {/* Search Input */}
    <input
      type="text"
      placeholder="Search tasks..."
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      autoFocus
      className="w-full py-2 px-4 rounded-xl bg-transparent border border-slate-300
                 dark:border-slate-700 dark:bg-slate-800/40 dark:text-white
                 focus:ring-2 focus:ring-teal-400 outline-none placeholder-slate-400"
    />

    {/* Close Button */}
    <button onClick={() => { setIsSearchOpen(false); setSearchQuery(""); }}>
      <span className="text-slate-500 hover:text-red-400 text-xl font-bold">✕</span>
    </button>
  </div>
</div>


      {/* Task Input */}
     <div className="flex w-full gap-4   items-center!">
  <div className="flex-1">
    <TaskInput addTask={addTask} newTask={newTask} setNewTask={setNewTask} key={tasks.id} />
  </div>

  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <button className="bg-transparent! p-1! dark:bg-transparent mb-15
 dark:border-transparent sm:mb-2
hover:bg-slate-100 dark:hover:bg-slate-800
">
        <Filter className="w-5 h-7  text-slate-400 group-hover:text-teal-400 transition-colors" />
      </button>
    </DropdownMenuTrigger>

    <DropdownMenuContent className="bg-white dark:bg-slate-900
border border-slate-200 dark:border-slate-700
shadow-md
">
      {columns.map((col) => (
        <DropdownMenuCheckboxItem
          key={col.id}
          checked={visibleColumns.includes(col.id)}
          onCheckedChange={(checked) => {
            setVisibleColumns(prev =>
              checked
                ? [...prev, col.id]
                : prev.filter(id => id !== col.id)
            );
          }}
        >
          {col.name}
        </DropdownMenuCheckboxItem>
      ))}
    </DropdownMenuContent>
  </DropdownMenu>
</div>


      {/* Kanban */}
      <div className="relative z-0 overflow-x-auto">
        <DragDropContext onDragEnd={handleDragEnd}>

          {/* ⭐ FIXED: Now columns fill space properly keep flex row til small and then go for flex col means flex col in small devices and till small that means for big ones keep row  */}
<div className=" flex flex-col sm:flex-row
 gap-6 w-full pb-6 md:overflow-x-auto">

            {columns.filter(col=> visibleColumns.includes(col.id)).map((column) => (
              <Droppable
                key={column.id}
                isDropDisabled={false}
                isCombineEnabled={false}
                ignoreContainerClipping={false}
                droppableId={column.id}
                direction="vertical"
              >
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}

                    //   COLUMN STYLING 
                   className={`
  bg-white dark:bg-slate-800/50 p-4 rounded-2xl flex flex-col 
  min-h-[400px] min-w-[280px] flex-1 
  dark:border-2 transition-all duration-200 md:shadow-xl
  ${snapshot.isDraggingOver
    ? "dark:border-teal-500/50 bg-slate-800/60 shadow-[0_0_15px_rgba(20,184,166,0.1)]"
    : "dark:border-slate-700/50 border-[#f1f1f1]"
  }
`}

                  >

                    <h2 className="font-bold mb-3 text-black  dark:text-white">{column.name}</h2>

                    {tasksByColumn[column.id].map((task, index) => (
                      <Draggable
                        key={task.id}
                        draggableId={task.id.toString()}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <TaskItem
                              task={task}
                              deleteTask={deleteTask}
                              updateTaskStatus={updateTaskStatus}
                            />
                          </div>
                        )}
                      </Draggable>
                    ))}

                    {provided.placeholder}

                    {/* Empty State */}
                    {tasksByColumn[column.id].length === 0 && (
                      <div className="h-full flex items-center justify-center text-slate-600 text-sm italic border-2 border-dashed border-slate-700/50 rounded-xl">
                        Drop tasks here
                      </div>
                    )}

                  </div>
                )}
              </Droppable>
            ))}

          </div>
        </DragDropContext>
      </div>
    </div>
  );
};

export default TaskWindow;
