import SubmitButton from '@/components/SubmitButton/SubmitButton'
import { resetPassword } from '@/utils/ServerActions'

export default function ResetPassword() {
  return (
    <form action={ resetPassword }>
      <label>
        <span>Email:</span>
        <input 
          type="email" 
          name="email" 
          required
          />
      </label>
      <SubmitButton />
    </form>
  )
}
