// src/middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
// import { auth } from '@/lib/auth'; // Import จาก lib/auth.ts ที่เราเคยสร้าง

// รายชื่อหน้าที่เป็น Public (สำหรับผู้ที่ยังไม่ได้ Login)
const publicRoutes = ['/login', '/register'];

// รายชื่อหน้าที่เป็น Protected (สำหรับผู้ที่ Login แล้วเท่านั้น)
const protectedRoutes = ['/feed', '/settings'];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
//   const session = await auth(); // ตรวจสอบ session ปัจจุบัน
  const session = false;

  const isPublicRoute = publicRoutes.includes(pathname);
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));

  // Logic 1: หากยังไม่ Login และพยายามเข้าหน้า Protected
  if (isProtectedRoute && !session) {
    // Redirect ไปหน้า Login
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Logic 2: หาก Login แล้ว และพยายามเข้าหน้า Public (เช่น Login, Register)
  if (isPublicRoute && session) {
    // Redirect ไปหน้า Feed
    return NextResponse.redirect(new URL('/feed', request.url));
  }

  // หากไม่เข้าเงื่อนไขใดๆ ก็ให้ไปต่อตามปกติ
  return NextResponse.next();
}

// Config: ระบุว่า Middleware นี้จะทำงานกับ Route ไหนบ้าง
// เพื่อ Performance ที่ดี ไม่ต้องรันบนไฟล์ static หรือ images
export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};