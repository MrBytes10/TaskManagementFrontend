"use client"

import type React from "react"

import { useState } from "react" // Can use react context or redux// check edge case when 
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface AuthFormProps {
  type: "signup" | "signin"
  onSubmit: (data: any) => void
  loading: boolean
  error: string | null
  success: string | null
}

export default function AuthForm({ type, onSubmit, loading, error, success }: AuthFormProps) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !password || (type === "signup" && !name)) {
      alert("Please fill in all fields.")
      return
    }
    onSubmit(type === "signup" ? { email, password, name } : { email, password })
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl text-center">{type === "signup" ? "Sign Up" : "Sign In"}</CardTitle>
        <CardDescription className="text-center">
          {type === "signup" ? "Create your account" : "Enter your credentials to access your tasks"}
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          {type === "signup" && (
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          )}
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          {success && <p className="text-green-500 text-sm">{success}</p>}
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Loading..." : type === "signup" ? "Sign Up" : "Sign In"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
