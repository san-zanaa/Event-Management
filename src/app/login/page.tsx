import { LoginForm } from "@/components/login-form"

export default function Page() {
  return (
    <div className="flex w-full items-center justify-center p-6 md:p-12">
      <div className="w-full max-w-sm p-2">
        <LoginForm />
      </div>
    </div>
  )
}
