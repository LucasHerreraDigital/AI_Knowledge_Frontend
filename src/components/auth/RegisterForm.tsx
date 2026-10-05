import { useState } from "react";
import { Link } from "react-router-dom";
import { User, Mail, Lock, UserPlus } from "lucide-react";

interface RegisterFormProps {
  onSubmit: (
    name: string,
    email: string,
    password: string
  ) => Promise<void>;

  loading?: boolean;
  error?: string | null;
}

const RegisterForm = ({
  onSubmit,
  loading = false,
  error,
}: RegisterFormProps) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await onSubmit(name, email, password);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Name */}
      <div>
        <label
          htmlFor="name"
          className="mb-2 block text-sm font-medium text-slate-300"
        >
          Nombre
        </label>

        <div className="relative">
          <User
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
          />

          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Tu nombre"
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
        <UserPlus size={18} />

        {loading ? "Creando cuenta..." : "Crear cuenta"}
      </button>

      <p className="text-center text-sm text-slate-400">
        ¿Ya tenés una cuenta?{" "}
        <Link
          to="/login"
          className="font-medium text-blue-400 hover:text-blue-300"
        >
          Iniciá sesión
        </Link>
      </p>
    </form>
  );
};

export default RegisterForm;