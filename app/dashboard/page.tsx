"use client"

import { useEffect, useState, useCallback } from "react"
import { useRouter } from "next/navigation"
import { apiFetch } from "@/lib/api"
import { API_ENDPOINTS } from "@/lib/config"
import type { Task, TaskStatus } from "@/lib/types"
import TaskCard from "@/components/TaskCard"
import { getToken } from "@/lib/auth"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { PlusCircle } from "lucide-react"

export default function DashboardPage() {
  const router = useRouter()
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [filterStatus, setFilterStatus] = useState<TaskStatus | "ALL">("ALL")
  const [loadingDelete, setLoadingDelete] = useState(false)

  const fetchTasks = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const token = getToken()
      if (!token) {
        router.push("/signin")
        return
      }

      let url = API_ENDPOINTS.TASKS
      if (filterStatus !== "ALL") {
        url = API_ENDPOINTS.TASKS_FILTERED(filterStatus)
      }
      const fetchedTasks = await apiFetch<Task[]>(url)
      setTasks(fetchedTasks)
    } catch (err: any) {
      setError(err.message || "Failed to fetch tasks.")
      if (err.message.includes("Unauthorized")) {
        router.push("/signin") // Redirect to signin if token is invalid/expired
      }
    } finally {
      setLoading(false)
    }
  }, [filterStatus, router])

  useEffect(() => {
    fetchTasks()
  }, [fetchTasks])

  const handleDeleteTask = async (id: string) => {
    if (!confirm("Are you sure you want to delete this task?")) return

    setLoadingDelete(true)
    setError(null)
    try {
      await apiFetch(API_ENDPOINTS.TASK_BY_ID(id), {
        method: "DELETE",
      })
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id))
    } catch (err: any) {
      setError(err.message || "Failed to delete task.")
    } finally {
      setLoadingDelete(false)
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-80px)]">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center text-red-500 min-h-[calc(100vh-80px)] flex items-center justify-center">
        <p>{error}</p>
      </div>
    )
  }

  return (
    <div className="space-y-6 py-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Your Tasks</h1>
        <div className="flex items-center space-x-4">
          <Select value={filterStatus} onValueChange={(value: TaskStatus | "ALL") => setFilterStatus(value)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">All</SelectItem>
              <SelectItem value="TODO">TODO</SelectItem>
              <SelectItem value="IN_PROGRESS">IN_PROGRESS</SelectItem>
              <SelectItem value="DONE">DONE</SelectItem>
            </SelectContent>
          </Select>
          <Link href="/tasks/create">
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              Create New Task
            </Button>
          </Link>
        </div>
      </div>

      {tasks.length === 0 ? (
        <p className="text-center text-muted-foreground">No tasks found. Create one!</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {tasks.map((task) => (
            <TaskCard key={task.id} task={task} onDelete={handleDeleteTask} loadingDelete={loadingDelete} />
          ))}
        </div>
      )}
    </div>
  )
}
