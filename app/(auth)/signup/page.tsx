import AuthForm from "@/components/AuthForm/AuthForm"
import { handleSignUp } from "@/utils/ServerActions"

export default function Signup() {
  return (
    <main>
      <h2 className="text-center">Sign up</h2>
      <AuthForm action={ handleSignUp } />
    </main>
  )
}