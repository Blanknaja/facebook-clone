// src/components/feature/LogoutButton.tsx
import { logoutAction } from "@/lib/actions/auth";
import { LogOut } from "lucide-react";

export function LogoutButton() {
  return (
    <form action={logoutAction}>
      <button
        type="submit"
        className="flex items-center w-full text-left p-2 hover:bg-gray-100 rounded-md"
      >
        <LogOut className="mr-2 h-4 w-4" />
        ออกจากระบบ
      </button>
    </form>
  );
}