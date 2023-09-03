"use client"
import { useRouter } from 'next/navigation'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Database } from '@/interfaces/supabase'

const LogoutButton = () => {
  const router = useRouter()

  const handleLogout = async () => {
    const supabase = createClientComponentClient<Database>()
    const { error } = await supabase.auth.signOut()

    if (!error) {
      router.push('/login')
    }
    else if (error) {
      throw new Error('Failed to Sign Out')
    }
  }

  return (
    <button className="btn-primary" onClick={ handleLogout }>
      Logout
    </button>
  )
}

export default LogoutButton