"use client"
import { useRouter } from 'next/navigation'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

const LogoutButton = () => {
  const router = useRouter()

  const handleLogout = async () => {
    const supabase = createClientComponentClient()
    
    try {
      await supabase.auth.signOut()
      router.push('/login')
    }
    catch(error) {
      console.log(error)
    }
  }

  return (
    <button className="btn-primary" onClick={ handleLogout }>
      Logout
    </button>
  )
}

export default LogoutButton