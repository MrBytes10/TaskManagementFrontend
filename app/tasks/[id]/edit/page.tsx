"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import TaskForm from "@/components/TaskForm"
import { apiFetch } from "@/lib/api"
import { API_ENDPOINTS } from "@/lib/config"
import type { Task, UpdateTaskPayload } from "@/lib/types"

export default function EditTaskPage() {
  const { id } = useParams()
  const router = useRouter()
  const [task, setTask] = useState<Task | null>(null)
  const [loadingFetch, setLoadingFetch] = useState(true)
  const [loadingUpdate, setLoadingUpdate] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  useEffect(() => {
    if (id) {
      const fetchTask = async () => {
        setLoadingFetch(true)
        setError(null)
        try {
          const fetchedTask = await apiFetch<Task>(API_ENDPOINTS.TASK_BY_ID(id as string))
          setTask(fetchedTask)
        } catch (err: any) {
          setError(err.message || "Failed to fetch task for editing.")
        } finally {
          setLoadingFetch(false)
        }
      }
      fetchTask()
    }
  }, [id])

  const handleUpdateTask = async (data: UpdateTaskPayload) => {
    setLoadingUpdate(true)
    setError(null)
    setSuccess(null)
    try {
      await apiFetch<Task>(API_ENDPOINTS.TASK_BY_ID(id as string), {
        method: "PUT",
        body: JSON.stringify(data),
      })
      setSuccess("Task updated successfully!")
      setTimeout(() => {
        router.push(`/tasks/${id}`)
      }, 1000)
    } catch (err: any) {
      setError(err.message || "Failed to update task.")
    } finally {
      setLoadingUpdate(false)
    }
  }

  if (loadingFetch) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-80px)]">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    )
  }

  if (error && !task) {
    return (
      <div className="text-center text-red-500 min-h-[calc(100vh-80px)] flex items-center justify-center">
        <p>{error}</p>
      </div>
    )
  }

  if (!task) {
    return (
      <div className="text-center text-muted-foreground min-h-[calc(100vh-80px)] flex items-center justify-center">
        <p>Task not found for editing.</p>
      </div>
    )
  }

  return (
    <div className="py-8">
      <TaskForm
        initialData={task}
        onSubmit={handleUpdateTask}
        loading={loadingUpdate}
        error={error}
        success={success}
      />
    </div>
  )
}
