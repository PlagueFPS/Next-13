import AuthForm from "@/components/AuthForm/AuthForm";
import { handleLogIn } from '@/utils/ServerActions';

export default function Login() {
  return (
    <main>
      <h2 className="text-center">Login</h2>
      <AuthForm action={ handleLogIn } login />
    </main>
  )
}