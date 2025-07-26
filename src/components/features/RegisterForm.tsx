// src/components/features/RegisterForm.tsx
"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom"; // <--- useFormStatus ยังคงอยู่ที่ 'react-dom'
import { registerAction } from "@/lib/actions/auth";
import Link from "next/link";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="flex w-full justify-center rounded-md bg-green-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-500 disabled:bg-gray-400"
    >
      {pending ? "กำลังสมัคร..." : "สมัครสมาชิก"}
    </button>
  );
}

export function RegisterForm() {
  const [state, formAction] = useActionState(registerAction, undefined);

  return (
    <>
      <form action={formAction} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium">ชื่อ-นามสกุล</label>
          <input id="name" name="name" type="text" required className="mt-2 block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300"/>
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium">อีเมล</label>
          <input id="email" name="email" type="email" required className="mt-2 block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300"/>
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium">รหัสผ่าน</label>
          <input id="password" name="password" type="password" required minLength={6} className="mt-2 block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300"/>
        </div>

        {state?.message && (
          <div className={`text-sm ${state.success ? 'text-green-600' : 'text-red-500'}`}>
            {state.message}
          </div>
        )}

        <div>
          <SubmitButton />
        </div>
      </form>
      <p className="mt-10 text-center text-sm text-gray-500">
        เป็นสมาชิกอยู่แล้ว?{' '}
        <Link href="/login" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
          เข้าสู่ระบบที่นี่
        </Link>
      </p>
    </>
  );
}