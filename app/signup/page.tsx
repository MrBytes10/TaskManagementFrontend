"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import AuthForm from "@/components/AuthForm"
import { apiFetch } from "@/lib/api"
import { API_ENDPOINTS } from "@/lib/config"
import type { AuthResponse } from "@/lib/types"

export default function SignUpPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  const handleSignUp = async (data: any) => {
    setLoading(true)
    setError(null)
    setSuccess(null)
    try {
      await apiFetch<AuthResponse>(API_ENDPOINTS.SIGNUP, {
        method: "POST",
        body: JSON.stringify(data),
      })
      setSuccess("Account created successfully! Redirecting to sign in...")
      setTimeout(() => {
        router.push("/signin")
      }, 2000)
    } catch (err: any) {
      setError(err.message || "Failed to sign up.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-80px)]">
      <AuthForm type="signup" onSubmit={handleSignUp} loading={loading} error={error} success={success} />
    </div>
  )
}
