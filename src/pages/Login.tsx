import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import LoginForm from "../components/auth/LoginForm";
import { login } from "../services/auth.service";
import { useAuthStore } from "../store/auth.store";

const Login = () => {
  const navigate = useNavigate();

  const setAuth = useAuthStore((state) => state.setAuth);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (email: string, password: string) => {
    try {
      setLoading(true);
      setError(null);

      const data = await login({
        email,
        password,
      });

      setAuth(data.user, data.accessToken);

      navigate("/dashboard");
    } catch (error: any) {
      setError(
        error.response?.data?.message ||
          "No se pudo iniciar sesión."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B1120]">
      <div className="flex min-h-screen items-center justify-center px-4">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="mb-8 text-center">
            <Link
              to="/"
              className="text-2xl font-bold text-white"
            >
              AI Knowledge
            </Link>

            <p className="mt-2 text-sm text-slate-500">
              Iniciá sesión en tu cuenta
            </p>
          </div>

          {/* Card */}
          <div
            className="
              rounded-xl border border-slate-800
              bg-[#0F172A] p-6 shadow-xl
            "
          >
            <LoginForm
              onSubmit={handleLogin}
              loading={loading}
              error={error}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;