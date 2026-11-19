
import { useState, useRef, useEffect } from "react";
import Avatar from "../common/Avatar";
import type { User } from "../../types/user";
import { logout } from "../../services/auth.service";
import { useAuthStore } from "../../store/auth.store";
import {
  LogOut,
  Sun,
  Moon,
  ChevronUp,
  Monitor,
  Check,
} from "lucide-react";
import { useThemeStore } from "../../store/theme.store";

interface SidebarFooterProps {
  user: User;
}

const SidebarFooter = ({ user }: SidebarFooterProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const sidebarFooterRef = useRef<HTMLDivElement>(null);

  const clearAuth = useAuthStore((state) => state.clearAuth);
  const theme = useThemeStore((state) => state.theme);
  const setTheme = useThemeStore((state) => state.setTheme);

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        sidebarFooterRef.current &&
        !sidebarFooterRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen]);

  const handleLogout = async () => {
    try {
      await logout();
    } catch {
    } finally {
      clearAuth();
    }
  };

  const themeOptions = [
    { value: "light", label: "Tema claro", icon: Sun },
    { value: "dark", label: "Tema oscuro", icon: Moon },
    { value: "system", label: "Tema del sistema", icon: Monitor },
  ] as const;

  return (
    <div
      className="relative border-t border-border pt-3 transition-colors"
      ref={sidebarFooterRef}
    >
      {/* Dropdown */}
      {isOpen && (
        <div className="absolute bottom-full left-0 z-50 mb-2 w-full overflow-hidden rounded-xl border border-border bg-surface p-2 shadow-xl animate-in fade-in slide-in-from-bottom-2 duration-200">

          {/* Cuenta */}
          <div className="border-b border-border px-3 py-3">
            <p className="truncate text-sm font-semibold text-text-primary">
              {user.name}
            </p>

            <p className="mt-0.5 text-xs text-text-secondary">
              Mi cuenta
            </p>
          </div>

          {/* Apariencia */}
          <div className="py-2">
            <p className="px-3 pb-2 text-xs font-medium uppercase tracking-wider text-text-secondary">
              Apariencia
            </p>

            <div className="space-y-1">
              {themeOptions.map(({ value, label, icon: Icon }) => {
                const isActive = theme === value;

                return (
                  <button
                    key={value}
                    onClick={() => {
                      setTheme(value);
                      setIsOpen(false);
                    }}
                    aria-pressed={isActive}
                    className={`
                      flex w-full items-center justify-between
                      rounded-lg px-3 py-2.5 text-sm
                      transition-colors duration-150
                      ${
                        isActive
                          ? "bg-background text-text-primary"
                          : "text-text-secondary hover:bg-background hover:text-text-primary"
                      }
                    `}
                  >
                    <span className="flex items-center gap-3">
                      <Icon size={17} />
                      {label}
                    </span>

                    {isActive && (
                      <Check
                        size={16}
                        className="text-text-primary"
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Cerrar sesión */}
          <div className="border-t border-border pt-2">
            <button
              onClick={handleLogout}
              className="
                flex w-full items-center gap-3
                rounded-lg px-3 py-2.5 text-sm
                text-red-500
                transition-colors duration-150
                hover:bg-red-500/20
              "
            >
              <LogOut size={17} />
              Cerrar sesión
            </button>
          </div>
        </div>
      )}

      {/* Avatar / Botón de cuenta */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        className="
          flex w-full items-center justify-between
          rounded-lg p-2
          text-text-secondary
          transition-colors duration-150
          hover:bg-background hover:text-text-primary
        "
      >
        <div className="flex min-w-0 items-center gap-3">
          <Avatar name={user.name} />
        </div>

        <ChevronUp
          size={18}
          className={`
            shrink-0 transition-transform duration-200
            ${isOpen ? "" : "rotate-180"}
          `}
        />
      </button>
    </div>
  );
};

export default SidebarFooter;
