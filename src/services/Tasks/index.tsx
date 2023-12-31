import axios from "axios";

const createNewTask = async (
  taskPayload: TaskPayload
): Promise<Task> => {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_REACT_APP_API_URL}/api/tasks`,
    taskPayload,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(
          "token"
        )}`,
      },
    }
  );

  return response.data;
};

const updateExistingTask = async (
  taskId: number,
  taskPayload: TaskPayload
): Promise<Task> => {
  const response = await axios.put(
    `${process.env.NEXT_PUBLIC_REACT_APP_API_URL}/api/tasks/${taskId}`,
    taskPayload,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(
          "token"
        )}`,
      },
    }
  );

  return response.data;
};

const deleteExistingTask = async (
  taskId: number
): Promise<void> => {
  await axios.delete(
    `${process.env.NEXT_PUBLIC_REACT_APP_API_URL}/api/tasks/${taskId}`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(
          "token"
        )}`,
      },
    }
  );
};

const getAllTasks = async (): Promise<Task[]> => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_REACT_APP_API_URL}/api/tasks`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(
          "token"
        )}`,
      },
    }
  );

  return response.data;
};

const getTask = async (taskId: number): Promise<Task> => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_REACT_APP_API_URL}/api/tasks/${taskId}`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(
          "token"
        )}`,
      },
    }
  );

  return response.data;
};

const TasksService = {
  createNewTask,
  updateExistingTask,
  deleteExistingTask,
  getAllTasks,
  getTask,
};

export { TasksService };
