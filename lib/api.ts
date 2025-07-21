import { API_BASE_URL } from "./config"
import { getToken } from "./auth"

interface RequestOptions extends RequestInit {
  headers?: HeadersInit
}

export async function apiFetch<T>(url: string, options: RequestOptions = {}): Promise<T> {
  const token = getToken()
  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...options.headers,
  }

  if (token) {
    headers["Authorization"] = `Bearer ${token}`
  }

  const response = await fetch(`${API_BASE_URL}${url}`, {
    ...options,
    headers,
  })

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ message: response.statusText }))
    throw new Error(errorData.message || "An error occurred")
  }

  // Handle 204 No Content for DELETE requests
  if (response.status === 204) {
    return null as T
  }

  return response.json() as T
}
