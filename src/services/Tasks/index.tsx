import axios from "axios";

const { NEXT_PUBLIC_REACT_APP_API_URL  } = process.env;

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
    `${NEXT_PUBLIC_REACT_APP_API_URL}/api/tasks`,
    taskPayload, { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
  );

  return response.data;
};

const updateExistingTask = async (
  taskId: number,
  taskPayload: TaskPayload
): Promise<Task> => {
  const response = await axios.put(
    `${NEXT_PUBLIC_REACT_APP_API_URL}/api/tasks/${taskId}`, 
    taskPayload, { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
  );

  return response.data;
};

const deleteExistingTask = async (
  taskId: number
): Promise<void> => {
  await axios.delete(
    `${NEXT_PUBLIC_REACT_APP_API_URL}/api/tasks/${taskId}`, { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
  );
};

const getAllTasks = async (): Promise<Task[]> => {
  const response = await axios.get(
    `${NEXT_PUBLIC_REACT_APP_API_URL}/api/tasks`, { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
  );

  return response.data;
};

const getTask = async (taskId: number): Promise<Task> => {
  const response = await axios.get(
    `${NEXT_PUBLIC_REACT_APP_API_URL}/api/tasks/${taskId}`, { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
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
