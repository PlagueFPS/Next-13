"use client"
import { useState } from 'react'
import { useRouter } from 'next/navigation';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import AuthForm from "@/components/AuthForm/AuthForm";

export default function Login() {
  const [formError, setError] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: any, email: string, password: string) => {
    e.preventDefault()
    setError('')
    const supabase = createClientComponentClient()
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    })

    if (!error) {
      router.push('/')
    }
    else if (error) {
      setError(error.message)
    }

  }

  return (
    <main>
      <h2 className="text-center">Login</h2>
      <AuthForm handleSubmit={ handleSubmit } />

      { formError && (
        <div className="error">{ formError }</div>
      )}
    </main>
  )
}