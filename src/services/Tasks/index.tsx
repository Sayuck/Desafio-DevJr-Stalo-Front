import axios from "axios";

const { NEXT_PUBLIC_REACT_APP_API_URL } = process.env;

const axiosInstance = axios.create({
  baseURL: NEXT_PUBLIC_REACT_APP_API_URL,
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

const createNewTask = async (
  taskPayload: TaskPayload
): Promise<Task> => {
  const response = await axios.post(
    `${NEXT_PUBLIC_REACT_APP_API_URL}/tasks`,
    taskPayload
  );

  return response.data;
};

const updateExistingTask = async (
  taskId: number,
  taskPayload: TaskPayload
): Promise<Task> => {
  const response = await axios.put(
    `${NEXT_PUBLIC_REACT_APP_API_URL}/task/${taskId}`,
    taskPayload
  );

  return response.data;
};

const deleteExistingTask = async (
  taskId: number
): Promise<void> => {
  await axios.delete(
    `${NEXT_PUBLIC_REACT_APP_API_URL}/task/${taskId}`
  );
};

const getAllTasks = async (): Promise<Task[]> => {
  const response = await axios.get(
    `${NEXT_PUBLIC_REACT_APP_API_URL}/tasks`
  );

  return response.data;
};

const getTask = async (taskId: number): Promise<Task> => {
  const response = await axios.get(
    `${NEXT_PUBLIC_REACT_APP_API_URL}/task/${taskId}`
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

export default TasksService;
