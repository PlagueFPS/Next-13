import Link from "next/link"
import SubmitButton from "../SubmitButton/SubmitButton"

interface AuthFormProps {
  login?: boolean
  action: (formData: FormData) => Promise<void>
}

const AuthForm = ({ login, action }: AuthFormProps) => {
  return (
    <form action={ action }>
      { login && <Link href='/reset-password'>Reset Password?</Link> }
      <label>
        <span>Email:</span>
        <input 
          name="email"
          type="email" 
          required
        />
      </label>
      <label>
        <span>Password:</span>
        <input 
          name="password"
          type="password" 
          required
        />
      </label>
      <SubmitButton />
    </form>
  )
}

export default AuthForm