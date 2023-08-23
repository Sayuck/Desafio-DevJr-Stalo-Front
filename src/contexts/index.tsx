// create a context to store tasks and a function to update tasks

import React, { createContext, useEffect } from "react";

import { TasksService } from "@services/Tasks";

export const TasksContext = createContext<{
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
    handleUpdateTask: () => void;
}>({
  tasks: [],
  setTasks: () => null,
    handleUpdateTask: () => null,
});

export function TasksContextProvider({ children }) {
  const [tasks, setTasks] = React.useState<Task[]>([]);

  useEffect(() => {
    TasksService.getAllTasks().then((allTasks) => {
      setTasks(allTasks);
    });
  }, [setTasks]);

  function handleUpdateTask() {
    TasksService.getAllTasks().then((allTasks) => {
      setTasks(allTasks);
    });
  }

  return (
    <TasksContext.Provider
      value={{ tasks, setTasks, handleUpdateTask }}
    >
      {children}
    </TasksContext.Provider>
  );
}

const useTasks = () => React.useContext(TasksContext);

export { useTasks };
