// src/lib/actions.ts
"use server";

import { signIn, signOut } from "@/lib/auth";
import { AuthError } from "next-auth";

export async function loginAction(prevState: any, formData: FormData) {
  try {
    // [ แก้ไขตรงนี้ ]
    // เพิ่ม redirectTo: '/feed' เข้าไปใน object ที่สอง
    // เพื่อบอก signIn อย่างชัดเจนว่า "ถ้าสำเร็จ ให้ส่งไปที่ /feed เลยนะ"
    await signIn("credentials", {
      ...Object.fromEntries(formData),
      redirectTo: "/feed",
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { message: "อีเมลหรือรหัสผ่านไม่ถูกต้อง" };
        default:
          return { message: "เกิดข้อผิดพลาดบางอย่าง กรุณาลองใหม่อีกครั้ง" };
      }
    }
    throw error;
  }
  return { message: "" };
}

export async function logoutAction() {
  // signOut ของ NextAuth จะจัดการทุกอย่างให้เรา
  // ทั้งการลบ Session Cookie และการ Redirect
  await signOut({
    redirectTo: "/login",
  });
}
