"use server"
import { createServerActionClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { Database } from '@/interfaces/supabase'

export async function addTicket(formData: FormData) {
  const ticket = Object.fromEntries(formData)
  const supabase = createServerActionClient<Database>({ cookies })
  const { data: { session } } = await supabase.auth.getSession()
  const { error } = await supabase.from('tickets')
    .insert({
      ...ticket,
      user_email: session?.user.email
    })

  if (error) {
    throw new Error('Failed to add the new ticket.')
  }

  revalidatePath('/tickets')
  redirect('/tickets')
}

export async function deleteTicket(id: number) {
  const supabase = createServerActionClient<Database>({ cookies })
  const { error } = await supabase.from('tickets').delete().eq('id', id)

  if (error) {
    throw new Error('Failed to delete the ticket.')
  }

  revalidatePath('/tickets')
  redirect('/tickets')
}

export async function handleSignUp(formData: FormData) {
  const { email, password }: any = Object.fromEntries(formData)
  const supabase = createServerActionClient<Database>({ cookies })
  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${process.env.NEXT_PUBLIC_WEBSITE_URL}/api/auth/callback`
    }
  })

  if (!error) {
    redirect('/verify')
  }
  else if (error) {
    throw new Error('Failed to Sign Up')
  }
}

export async function handleLogIn(formData: FormData) {
  const { email, password }: any = Object.fromEntries(formData)
  const supabase = createServerActionClient<Database>({ cookies })
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password
  })

  if (!error) {
    redirect('/')
  }
  else if (error) {
    throw new Error('Failed to Log In')
  }
}

export async function resetPassword(formData: FormData) {
  const { email } = Object.fromEntries(formData)
  const supabase = createServerActionClient<Database>({ cookies })
  const { error } = await supabase.auth.resetPasswordForEmail(email.toString(), {
    redirectTo: `${process.env.NEXT_PUBLIC_WEBSITE_URL}/api/auth/reset?next=${process.env.NEXT_PUBLIC_WEBSITE_URL}/update-password`
  })

  if (!error) {
    redirect('/verify')
  }
  else if (error) {
    throw new Error('Failed to reset password')
  }
}

export async function updatePassword(formData: FormData) {
  const { password } = Object.fromEntries(formData)
  const supabase = createServerActionClient<Database>({ cookies })
  const { error } = await supabase.auth.updateUser({ password: password.toString() })

  if (!error) {
    redirect('/')
  }
  else if (error) {
    throw new Error('Failed to Update Password')
  }
}