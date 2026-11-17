
import { useState } from "react";
import Avatar from "../common/Avatar";
import type { User } from "../../types/user";
import { logout } from "../../services/auth.service";
import { useAuthStore } from "../../store/auth.store";
import {
  LogOut,
  Sun,
  Moon,
  ChevronUp,
  Monitor
} from "lucide-react";

interface SidebarFooterProps {
  user: User;
}

const SidebarFooter = ({ user }: SidebarFooterProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const clearAuth = useAuthStore((state) => state.clearAuth);

  // Temporal: reemplazar por tu sistema global de temas
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  const handleLogout = async () => {
    try {
      await logout();
    } catch {
      // Aunque falle el logout del servidor,
      // limpiamos la sesión local.
    } finally {
      clearAuth();
    }
  };

  const handleThemeChange = (newTheme: "light" | "dark") => {
    setTheme(newTheme);
    document.documentElement.classList.toggle(
      "dark",
      newTheme === "dark"
    );
  };

  return (
    <div className="relative border-t border-gray-200 dark:border-gray-700 pt-3 ">

      {isOpen && (
        <div className="absolute bottom-full left-0 mb-2 w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-lg p-2">

          <div className="px-3 py-2 border-b border-gray-200 dark:border-gray-700">
            <p className="text-sm font-semibold text-gray-900 dark:text-white">
              {user.name}
            </p>
            <p className="text-xs text-gray-500">
              Mi cuenta
            </p>
          </div>

          {/* Tema */}
          <div className="p-2">
            <p className="text-xs text-gray-500 px-2 mb-2">
              Apariencia
            </p>

            <button
              onClick={() => handleThemeChange("light")}
              className={`flex items-center gap-2 w-full rounded-lg px-3 py-2 text-sm ${
                theme === "light"
                  ? "bg-gray-100 dark:bg-gray-800"
                  : "hover:bg-gray-100 dark:hover:bg-gray-800"
              }`}
            >
              <Sun size={17} />
              Tema claro
            </button>

            <button
              onClick={() => handleThemeChange("dark")}
              className={`flex items-center gap-2 w-full rounded-lg px-3 py-2 text-sm ${
                theme === "dark"
                  ? "bg-gray-100 dark:bg-gray-800"
                  : "hover:bg-gray-100 dark:hover:bg-gray-800"
              }`}
            >
              <Moon size={17} />
              Tema oscuro
            </button>
          </div>

          <div className="border-t border-gray-200 dark:border-gray-700 pt-2">
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 w-full rounded-lg px-3 py-2 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-950"
            >
              <LogOut size={17} />
              Cerrar sesión
            </button>
          </div>
        </div>
      )}

      {/* Avatar */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center justify-between w-full rounded-lg p-2 hover:cursor-pointer  transition-colors"
      >
        <div className="flex items-center gap-3">
          <Avatar name={user.name} />

          
        </div>

        <ChevronUp
          size={18}
          className={`transition-transform ${
            isOpen ? "" : "rotate-180"
          }`}
        />
      </button>
    </div>
  );
};

export default SidebarFooter;
