interface Task {
    id: number
    title: string
    description: string
    active: boolean
    created_at: Date
    updated_at: Date
  }
  
  interface TaskPayload {
    title: string
    description: string
    active: boolean
  }