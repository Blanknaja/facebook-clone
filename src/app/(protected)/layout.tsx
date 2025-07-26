// src/app/(protected)/layout.tsx
import { auth } from "@/lib/auth";
import { LogoutButton } from "@/components/features/LogoutButton";

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth(); // ดึงข้อมูล session ใน Server Component

  return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-gray-50 p-4 border-r">
        <h2 className="font-bold text-lg mb-4">Facebook Clone</h2>
        <nav className="space-y-2">
          <p>Welcome, {session?.user?.name ?? "User"}</p>
          {/* เพิ่มลิงก์เมนูต่างๆ ตรงนี้ เช่น Feed, Settings */}
        </nav>
        <div className="mt-auto pt-4 border-t">
          <LogoutButton />
        </div>
      </aside>
      <main className="flex-1 p-6">
        {children}
      </main>
    </div>
  );
}