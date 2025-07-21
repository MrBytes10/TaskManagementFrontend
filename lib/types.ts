export type TaskStatus = "TODO" | "IN_PROGRESS" | "DONE"

export interface User {
  id: string
  email: string
  name: string
  createdAt: string
}

export interface AuthResponse {
  user: User
  token: string
}

export interface Task {
  id: string
  userId: string
  title: string
  description: string
  status: TaskStatus
  createdAt: string
  updatedAt: string | null
}

export interface CreateTaskPayload {
  title: string
  description: string
  status: TaskStatus
}

export interface UpdateTaskPayload {
  title?: string
  description?: string
  status?: TaskStatus
}
