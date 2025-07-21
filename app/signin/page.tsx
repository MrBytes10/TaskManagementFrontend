"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import AuthForm from "@/components/AuthForm"
import { apiFetch } from "@/lib/api"
import { API_ENDPOINTS } from "@/lib/config"
import { setToken } from "@/lib/auth"
import type { AuthResponse } from "@/lib/types"

export default function SignInPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  const handleSignIn = async (data: any) => {
    setLoading(true)
    setError(null)
    setSuccess(null)
    try {
      const result = await apiFetch<AuthResponse>(API_ENDPOINTS.SIGNIN, {
        method: "POST",
        body: JSON.stringify(data),
      })
      setToken(result.token)
      setSuccess("Signed in successfully! Redirecting to dashboard...")
      setTimeout(() => {
        router.push("/dashboard")
      }, 1000)
    } catch (err: any) {
      setError(err.message || "Failed to sign in. Please check your credentials.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-80px)]">
      <AuthForm type="signin" onSubmit={handleSignIn} loading={loading} error={error} success={success} />
    </div>
  )
}
