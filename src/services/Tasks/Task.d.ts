interface Task {
    id: number
    description: string
    completed: boolean
    created_at: Date
    updated_at: Date
  }
  
  interface TaskPayload {
    description: string
    completed: boolean
  }