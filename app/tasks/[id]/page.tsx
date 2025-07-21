"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { apiFetch } from "@/lib/api"
import { API_ENDPOINTS } from "@/lib/config"
import type { Task } from "@/lib/types"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Edit } from "lucide-react"

export default function ViewTaskPage() {
  const { id } = useParams()
  const router = useRouter()
  const [task, setTask] = useState<Task | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (id) {
      const fetchTask = async () => {
        setLoading(true)
        setError(null)
        try {
          const fetchedTask = await apiFetch<Task>(API_ENDPOINTS.TASK_BY_ID(id as string))
          setTask(fetchedTask)
        } catch (err: any) {
          setError(err.message || "Failed to fetch task.")
        } finally {
          setLoading(false)
        }
      }
      fetchTask()
    }
  }, [id])

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

  if (!task) {
    return (
      <div className="text-center text-muted-foreground min-h-[calc(100vh-80px)] flex items-center justify-center">
        <p>Task not found.</p>
      </div>
    )
  }

  return (
    <div className="py-8 flex justify-center">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="text-3xl">{task.title}</CardTitle>
          <CardDescription>
            Status: <span className="font-semibold">{task.status}</span>
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-semibold">Description:</h3>
            <p>{task.description}</p>
          </div>
          <div className="text-sm text-muted-foreground">
            <p>Created At: {new Date(task.createdAt).toLocaleString()}</p>
            {task.updatedAt && <p>Last Updated: {new Date(task.updatedAt).toLocaleString()}</p>}
          </div>
          <div className="flex justify-end">
            <Link href={`/tasks/${task.id}/edit`}>
              <Button>
                <Edit className="mr-2 h-4 w-4" />
                Edit Task
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
