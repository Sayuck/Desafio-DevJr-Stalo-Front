interface Task {
    id: number
    description: string
    active: boolean
    created_at: Date
    updated_at: Date
  }
  
  interface TaskPayload {
    description: string
    active: boolean
  }