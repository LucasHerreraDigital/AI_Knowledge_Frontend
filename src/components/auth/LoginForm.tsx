import { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, Lock, LogIn } from "lucide-react";

interface LoginFormProps {
  onSubmit: (email: string, password: string) => Promise<void>;
  loading?: boolean;
  error?: string | null;
}

const LoginForm = ({
  onSubmit,
  loading = false,
  error,
}: LoginFormProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await onSubmit(email, password);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Email */}
      <div>
        <label
          htmlFor="email"
          className="mb-2 block text-sm font-medium text-slate-300"
        >
          Email
        </label>

        <div className="relative">
          <Mail
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
          />

          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="tu@email.com"
            required
            className="
              w-full rounded-lg border border-slate-700
              bg-slate-900 py-3 pl-10 pr-4
              text-white placeholder-slate-500
              outline-none transition
              focus:border-blue-500
            "
          />
        </div>
      </div>

      {/* Password */}
      <div>
        <label
          htmlFor="password"
          className="mb-2 block text-sm font-medium text-slate-300"
        >
          Contraseña
        </label>

        <div className="relative">
          <Lock
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
          />

          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
            className="
              w-full rounded-lg border border-slate-700
              bg-slate-900 py-3 pl-10 pr-4
              text-white placeholder-slate-500
              outline-none transition
              focus:border-blue-500
            "
          />
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
          {error}
        </div>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className="
          flex w-full items-center justify-center gap-2
          rounded-lg bg-blue-600 px-4 py-3
          font-medium text-white
          transition hover:bg-blue-500
          disabled:cursor-not-allowed disabled:opacity-50
        "
      >
        <LogIn size={18} />

        {loading ? "Iniciando sesión..." : "Iniciar sesión"}
      </button>

      <p className="text-center text-sm text-slate-400">
        ¿No tenés una cuenta?{" "}
        <Link
          to="/register"
          className="font-medium text-blue-400 hover:text-blue-300"
        >
          Registrate
        </Link>
      </p>
    </form>
  );
};

export default LoginForm;