"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import type { Task } from "@/lib/types"
import { Trash2, Edit, Eye } from "lucide-react"

interface TaskCardProps {
  task: Task
  onDelete: (id: string) => void
  loadingDelete: boolean
}

export default function TaskCard({ task, onDelete, loadingDelete }: TaskCardProps) {
  return (
    <Card className="flex flex-col justify-between">
      <CardHeader>
        <CardTitle>{task.title}</CardTitle>
        <CardDescription className="line-clamp-2">{task.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          Status: <span className="font-semibold">{task.status}</span>
        </p>
        <p className="text-xs text-muted-foreground">Created: {new Date(task.createdAt).toLocaleDateString()}</p>
        {task.updatedAt && (
          <p className="text-xs text-muted-foreground">Updated: {new Date(task.updatedAt).toLocaleDateString()}</p>
        )}
      </CardContent>
      <CardFooter className="flex justify-end gap-2">
        <Link href={`/tasks/${task.id}`}>
          <Button variant="outline" size="icon">
            <Eye className="h-4 w-4" />
            <span className="sr-only">View</span>
          </Button>
        </Link>
        <Link href={`/tasks/${task.id}/edit`}>
          <Button variant="outline" size="icon">
            <Edit className="h-4 w-4" />
            <span className="sr-only">Edit</span>
          </Button>
        </Link>
        <Button variant="destructive" size="icon" onClick={() => onDelete(task.id)} disabled={loadingDelete}>
          <Trash2 className="h-4 w-4" />
          <span className="sr-only">Delete</span>
        </Button>
      </CardFooter>
    </Card>
  )
}
