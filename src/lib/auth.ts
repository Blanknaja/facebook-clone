// src/lib/auth.ts
import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@/lib/prisma";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs"; 
import Google from "next-auth/providers/google"; 

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  secret: process.env.AUTH_SECRET,
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      // --- นี่คือ Logic ที่ถูกต้อง ---
      authorize: async (credentials) => {
        if (!credentials?.email || !credentials.password) {
          return null;
        }

        // 1. ค้นหา user จาก email ใน DB
        const user = await prisma.user.findUnique({
          where: { email: credentials.email as string },
        });

        if (!user || !user.hashedPassword) {
          // ถ้าไม่เจอ user หรือ user คนนี้ไม่มีรหัสผ่าน (อาจจะ login ผ่าน Google)
          return null;
        }

        // 2. เปรียบเทียบรหัสผ่านที่ส่งมากับ hash ใน DB
        const isPasswordCorrect = await bcrypt.compare(
          credentials.password as string,
          user.hashedPassword
        );

        if (isPasswordCorrect) {
          // 3. ถ้ารหัสผ่านถูกต้อง ให้ return user object
          return user;
        }

        // ถ้ารหัสผ่านไม่ถูกต้อง
        return null;
      },
    }),
  ],
});