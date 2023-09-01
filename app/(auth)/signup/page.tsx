"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import AuthForm from "@/components/AuthForm/AuthForm"

export default function Signup() {
  const router = useRouter()
  const [formError, setError] = useState('')

  const handleSubmit = async (e: any, email: string, password: string) => {
    e.preventDefault()
    const supabase = createClientComponentClient()
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${location.origin}/api/auth/callback`
      }
    })

    if (!error) {
      router.push('/verify') 
    }
    else if (error) {
      setError(error.message)
    }
  }

  return (
    <main>
      <h2 className="text-center">Sign up</h2>
      <AuthForm handleSubmit={ handleSubmit } />
      { formError && (
        <div className="error">{ formError }</div>
      ) }
    </main>
  )
}