import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import RegisterForm from "../components/auth/RegisterForm";
import { register } from "../api/auth.api";

const Register = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleRegister = async (
    name: string,
    email: string,
    password: string
  ) => {
    try {
      setLoading(true);
      setError(null);

      await register({
        name,
        email,
        password,
      });

      navigate("/login");
    } catch (error: any) {
      setError(
        error.response?.data?.message ||
          "No se pudo crear la cuenta."
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
              Creá tu cuenta
            </p>
          </div>

          {/* Card */}
          <div
            className="
              rounded-xl border border-slate-800
              bg-[#0F172A] p-6 shadow-xl
            "
          >
            <RegisterForm
              onSubmit={handleRegister}
              loading={loading}
              error={error}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;