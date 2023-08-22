import { Services } from "@services"

const TaskService = Services.tasks.create("/tasks")

export const getTasks = TaskService.get

export const getChamadoById = (id: number) =>
  TaskService.get({ params: { id } })

export const createChamado = TaskService.post<TaskPayload>

export const updateChamado = TaskService.put<TaskPayload>

export const deleteChamado = TaskService.delete