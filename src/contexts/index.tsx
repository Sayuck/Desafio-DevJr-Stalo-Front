// create a context to store tasks and a function to update tasks


import React, { createContext, useEffect } from "react";
import { useSession } from "next-auth/react";

import { TasksService } from "@services/Tasks";

type FilterState = 'all' | 'completed' | 'uncompleted';

export const TasksContext = createContext<{
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
    handleUpdateTask: () => void;
    filterState: FilterState;
    setFilterState: React.Dispatch<React.SetStateAction<FilterState>>;
}>({
  tasks: [],
  setTasks: () => null,
    handleUpdateTask: () => null,
    filterState: 'all',
    setFilterState: () => null,
});

export function TasksContextProvider({ children }) {
  const [tasks, setTasks] = React.useState<Task[]>([]);
  const [filterState, setFilterState] = React.useState<FilterState>('all');
  const { data: session } = useSession();
  
  useEffect(() => {
    if (!session?.user?.token) return;
        
    TasksService.getAllTasks().then((allTasks) => {
        let filteredTask = allTasks;

        if (filterState === 'completed') {
            filteredTask = filteredTask.filter(task => task.completed);
        }
        else if (filterState === 'uncompleted') {
            filteredTask = filteredTask.filter(task => !task.completed);
        }


      setTasks(filteredTask);
    });
  }, [filterState, setTasks , session]);
  

  function handleUpdateTask() {
    TasksService.getAllTasks().then((allTasks) => {
        let filteredTask = allTasks;

        if (filterState === 'completed') {
            filteredTask = filteredTask.filter(task => task.completed);
        }
        else if (filterState === 'uncompleted') {
            filteredTask = filteredTask.filter(task => !task.completed);
        }

      setTasks(filteredTask);
    });
  }

  return (
    <TasksContext.Provider
      value={{ tasks, setTasks, handleUpdateTask, filterState, setFilterState }}
    >
      {children}
    </TasksContext.Provider>
  );
}

const useTasks = () => React.useContext(TasksContext);

export { useTasks };
