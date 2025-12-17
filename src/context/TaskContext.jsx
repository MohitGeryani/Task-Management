import { useLocalStorage } from "@/Hooks/useLocalStorage";
import React, { createContext, useContext, useCallback, useState } from "react";


const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useLocalStorage("tasks-board", [
    { id: 1, text: "Update menu with new seasonal dishes", status: "new" },
    { id: 2, text: "Conduct staff training", status: "in-progress" },
    { id: 3, text: "Review supplier contracts", status: "pending" },
    { id: 4, text: "Plan weekend promotions", status: "new" },
  ]);
   const [lastDeleted, setLastDeleted] = useState(null);
  const [showUndo, setShowUndo] = useState(false);

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


const editTask = useCallback((id, newText) => {
  if (!newText.trim()) return;
  setTasks(prev =>
    prev.map(task => (task.id === id ? { ...task, text: newText } : task))
  );
}, [setTasks]);



  const deleteTask = (task) => {
    setLastDeleted(task);
    setShowUndo(true);

    setTasks(prev => prev.filter(t => t.id !== task.id));

    setTimeout(() => {
      setLastDeleted(null);
      setShowUndo(false);
    }, 3000);
  };

  const undoDelete = () => {
    if (!lastDeleted) return;
    setTasks(prev => [...prev, lastDeleted]);
    setLastDeleted(null);
    setShowUndo(false);
  };

  // const deleteTask = useCallback(
  //   (id) => {
  //     setTasks((prev) => prev.filter((task) => task.id !== id));
  //   },
  //   [setTasks]
  // );


  // const undoTask = useCallback (
  //   (id) => {
  //     setTasks((prev) => prev.filter((task) => task.id== id ));
      
  //   },
  //   [setTasks]
  // );



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



   return (
    <TaskContext.Provider
      value={{
        tasks,
        addTask,
        deleteTask,
        undoDelete,
        editTask,
        updateTaskStatus,
        showUndo,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => useContext(TaskContext);


 // Only re-render context when tasks actually change
//   const value = useMemo(
//     () => ({
//       tasks,
//       addTask,
//       deleteTask,
//       undoDelete,
//       updateTaskStatus,
//       showUndo
//     }),
//     [tasks, addTask, deleteTask, undoTask, updateTaskStatus]
//   );

//   return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
// };

// export const useTasks = () => useContext(TaskContext);
