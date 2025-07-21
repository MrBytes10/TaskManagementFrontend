"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { removeToken, getToken } from "@/lib/auth"
import { useEffect, useState } from "react"

export default function Navbar() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    setIsAuthenticated(!!getToken())
  }, [])

  const handleLogout = () => {
    removeToken()
    setIsAuthenticated(false)
    router.push("/signin")
  }

  return (
    <nav className="bg-primary text-primary-foreground p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">
          Task Manager
        </Link>
        <div className="space-x-4">
          {isAuthenticated ? (
            <>
              <Link href="/dashboard">
                <Button variant="ghost" className="text-primary-foreground">
                  Dashboard
                </Button>
              </Link>
              <Link href="/tasks/create">
                <Button variant="ghost" className="text-primary-foreground">
                  Create Task
                </Button>
              </Link>
              <Button onClick={handleLogout} variant="ghost" className="text-primary-foreground">
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link href="/signin">
                <Button variant="ghost" className="text-primary-foreground">
                  Sign In
                </Button>
              </Link>
              <Link href="/signup">
                <Button variant="ghost" className="text-primary-foreground">
                  Sign Up
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}
