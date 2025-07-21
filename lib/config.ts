export const API_BASE_URL = "https://localhost:7015/api"; // Replace with your actual backend URL

export const API_ENDPOINTS = {
  SIGNUP: "/auth/signup",
  SIGNIN: "/auth/signin",
  TASKS: "/tasks", // For GET all and POST create
  TASK_BY_ID: (id: string) => `/tasks/${id}`, // For GET, PUT, DELETE by ID
  TASKS_FILTERED: (status: string) => `/tasks?status=${status}`, // For GET filtered
}
