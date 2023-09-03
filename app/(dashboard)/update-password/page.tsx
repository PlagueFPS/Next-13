import SubmitButton from "@/components/SubmitButton/SubmitButton";
import { updatePassword } from "@/utils/ServerActions";

export default function UpdatePassword() {
  return (
    <form action={ updatePassword }>
      <label>
        <span>New Password:</span>
        <input 
          type="password" 
          name="password" 
          required
          />
      </label>
      <SubmitButton />
    </form>
  )
}
