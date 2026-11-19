
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import RegisterForm from "../components/auth/RegisterForm";
import { register } from "../services/auth.service";

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
    <div className="min-h-screen bg-background transition-colors duration-200">
      <div className="flex min-h-screen items-center justify-center px-4 py-8">
        <div className="w-full max-w-md">

          {/* Header */}
          <div className="mb-8 text-center">
            <Link
              to="/"
              className="text-2xl font-bold text-text-primary transition-colors"
            >
              AI Knowledge
            </Link>

            <p className="mt-2 text-sm text-text-secondary">
              Creá tu cuenta
            </p>
          </div>

          {/* Card */}
          <div
            className="
              rounded-xl border border-border
              bg-surface p-6 shadow-xl
              transition-colors duration-200
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
