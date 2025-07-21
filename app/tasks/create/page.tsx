"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import TaskForm from "@/components/TaskForm"
import { apiFetch } from "@/lib/api"
import { API_ENDPOINTS } from "@/lib/config"
import type { CreateTaskPayload, Task } from "@/lib/types"

export default function CreateTaskPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  const handleCreateTask = async (data: CreateTaskPayload) => {
    setLoading(true)
    setError(null)
    setSuccess(null)
    try {
      await apiFetch<Task>(API_ENDPOINTS.TASKS, {
        method: "POST",
        body: JSON.stringify(data),
      })
      setSuccess("Task created successfully!")
      setTimeout(() => {
        router.push("/dashboard")
      }, 1000)
    } catch (err: any) {
      setError(err.message || "Failed to create task.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="py-8">
      <TaskForm onSubmit={handleCreateTask} loading={loading} error={error} success={success} />
    </div>
  )
}
