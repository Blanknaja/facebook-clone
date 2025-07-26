// src/components/feature/LoginForm.tsx
"use client";

// [ 1 ] แก้ไข import ให้ถูกต้อง
import { useActionState } from "react"; 
import { useFormStatus } from "react-dom"; // <--- useFormStatus ยังคงอยู่ที่ 'react-dom'
import { LogIn } from "lucide-react";
import { loginAction } from "@/lib/actions/auth";

function LoginButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:bg-gray-400"
    >
      {pending ? "กำลังเข้าสู่ระบบ..." : <><LogIn className="mr-2 h-4 w-4" /> เข้าสู่ระบบ</>}
    </button>
  );
}

export function LoginForm() {
  const [state, formAction] = useActionState(loginAction, undefined);

  return (
    <form action={formAction} className="space-y-6">
      <div>
        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
          อีเมล
        </label>
        <div className="mt-2">
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
          รหัสผ่าน
        </label>
        <div className="mt-2">
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>
      
      {state?.message && (
        <div className="text-sm text-red-500">{state.message}</div>
      )}

      <div>
        <LoginButton />
      </div>
    </form>
  );
}