import SubmitButton from "../SubmitButton/SubmitButton"

interface AuthFormProps {
  action: (formData: FormData) => Promise<void>
}

const AuthForm = ({ action }: AuthFormProps) => {
  return (
    <form action={ action }>
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