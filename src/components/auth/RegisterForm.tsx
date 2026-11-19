
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

  const inputClass = `
    w-full rounded-lg border border-border
    bg-background py-3 pl-10 pr-4
    text-text-primary placeholder:text-text-secondary
    outline-none transition-colors duration-150
    focus:border-text-primary
  `;

  return (
    <form onSubmit={handleSubmit} className="space-y-5">

      {/* Name */}
      <div>
        <label
          htmlFor="name"
          className="mb-2 block text-sm font-medium text-text-primary"
        >
          Nombre
        </label>

        <div className="relative">
          <User
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary"
          />

          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Tu nombre"
            required
            className={inputClass}
          />
        </div>
      </div>

      {/* Email */}
      <div>
        <label
          htmlFor="email"
          className="mb-2 block text-sm font-medium text-text-primary"
        >
          Email
        </label>

        <div className="relative">
          <Mail
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary"
          />

          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="tu@email.com"
            required
            className={inputClass}
          />
        </div>
      </div>

      {/* Password */}
      <div>
        <label
          htmlFor="password"
          className="mb-2 block text-sm font-medium text-text-primary"
        >
          Contraseña
        </label>

        <div className="relative">
          <Lock
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary"
          />

          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
            className={inputClass}
          />
        </div>
      </div>

      {/* Error */}
      {error && (
        <div
          role="alert"
          className="
            rounded-lg border border-red-500/20
            bg-red-500/10 px-4 py-3
            text-sm text-red-500
          "
        >
          {error}
        </div>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className="
          flex w-full items-center justify-center gap-2
          rounded-lg bg-text-primary px-4 py-3
          font-medium text-background
          transition-opacity duration-150
          hover:opacity-85
          disabled:cursor-not-allowed disabled:opacity-50
        "
      >
        <UserPlus size={18} />

        {loading ? "Creando cuenta..." : "Crear cuenta"}
      </button>

      {/* Login link */}
      <p className="text-center text-sm text-text-secondary">
        ¿Ya tenés una cuenta?{" "}
        <Link
          to="/login"
          className="
            font-medium text-text-primary
            underline-offset-4 transition-opacity
            hover:underline hover:opacity-75
          "
        >
          Iniciá sesión
        </Link>
      </p>

    </form>
  );
};

export default RegisterForm;
