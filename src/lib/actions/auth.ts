// src/lib/actions.ts
"use server";

import { signIn, signOut } from "@/lib/auth";
import { AuthError } from "next-auth";
import prisma from "@/lib/prisma"; // <-- เราจะสร้างไฟล์นี้ต่อไป
import bcrypt from "bcryptjs"; 



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


export async function registerAction(prevState: any, formData: FormData) {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
  
    if (!name || !email || !password) {
      return { success: false, message: "กรุณากรอกข้อมูลให้ครบถ้วน" };
    }
  
    try {
      const existingUser = await prisma.user.findUnique({ where: { email } });
      if (existingUser) {
        return { success: false, message: "อีเมลนี้ถูกใช้งานแล้ว" };
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
  
      await prisma.user.create({
        data: {
          name,
          email,
          hashedPassword,
        },
      });
  
      return { success: true, message: "สมัครสมาชิกสำเร็จ! กรุณาล็อกอิน" };
  
    } catch (error) {
      console.error(error);
      return { success: false, message: "เกิดข้อผิดพลาดบางอย่าง" };
    }
  }
