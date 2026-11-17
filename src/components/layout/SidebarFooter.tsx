
import { useState ,useRef, useEffect } from "react";
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
import { useThemeStore } from "../../store/theme.store";

interface SidebarFooterProps {
  user: User;
}

const SidebarFooter = ({ user }: SidebarFooterProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const sidebarFooterRef = useRef<HTMLDivElement>(null)

  const clearAuth = useAuthStore((state) => state.clearAuth);
  const theme = useThemeStore((state)=>state.theme)
  const setTheme = useThemeStore((state)=>state.setTheme)

  useEffect (()=>{

    if(!isOpen) return

    const handleClickOutside = (event:MouseEvent) =>{
      if(sidebarFooterRef.current && !sidebarFooterRef.current.contains(event.target as Node)){
        setIsOpen(false)
      }  
    }

    const handleEscape = (event:KeyboardEvent) =>{
      if(event.key === "Escape"){
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown",handleClickOutside)
    document.addEventListener("keydown",handleEscape)

    return () =>{
      document.removeEventListener("mousedown",handleClickOutside)
      document.removeEventListener("keydown",handleEscape)
    }

  },[isOpen])

  const handleLogout = async () => {
    try {
      await logout();
    } catch {
    } finally {
      clearAuth();
    }
  };

 

  return (
    <div className="relative border-t border-gray-200 dark:border-gray-700 pt-3 " ref={sidebarFooterRef}>

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
              onClick={() => {
                setTheme("light");
                setIsOpen(false) 
              }}
              className={`flex items-center gap-2 w-full rounded-lg px-3 py-2 text-sm ${
                theme === "light"
                  ? "bg-gray-100 dark:bg-gray-800"
                  : "hover:bg-gray-100 dark:hover:bg-gray-800"
              }`}
              aria-pressed={theme === "light"}
            >
              <Sun size={17} />
              Tema claro
            </button>

            <button
              onClick={() => {
                setTheme("dark");
                setIsOpen(false) 
              }}
              className={`flex items-center gap-2 w-full rounded-lg px-3 py-2 text-sm ${
                theme === "dark"
                  ? "bg-gray-100 dark:bg-gray-800"
                  : "hover:bg-gray-100 dark:hover:bg-gray-800"
              }`}
              aria-pressed={theme === "dark"}
            >
              <Moon size={17} />
              Tema oscuro
            </button>

            <button
              onClick={() =>{
                setTheme("system");
                setIsOpen(false) 
              }}
              className={`flex items-center gap-2 w-full rounded-lg px-3 py-2 text-sm ${
                theme === "system"
                  ? "bg-gray-100 dark:bg-gray-800"
                  : "hover:bg-gray-100 dark:hover:bg-gray-800"
              }`}
              aria-pressed={theme === "system"}
            >
              <Monitor size={17} />
              Tema del sistema
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
