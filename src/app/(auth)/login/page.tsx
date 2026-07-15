"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(email, password);
      router.push("/");
    } catch (err: any) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = async () => {
    setError("");
    setLoading(true);
    try {
      await login("admin@nestfinder.com", "admin123");
      router.push("/");
    } catch (err: any) {
      setError(err.message || "Demo login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl border border-border p-8">
      <h2 className="text-2xl font-bold text-dark text-center mb-6">
        Welcome Back
      </h2>

      {error && (
        <div className="bg-red-50 text-red-600 px-4 py-3 rounded-xl mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-dark mb-1">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Enter your email"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-dark mb-1">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-2 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Enter your password"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-primary text-white py-3 rounded-xl font-medium hover:bg-primary-dark disabled:opacity-50 transition-colors"
        >
          {loading ? "Signing in..." : "Sign In"}
        </button>
      </form>

      <div className="mt-4">
        <button
          onClick={handleDemoLogin}
          disabled={loading}
          className="w-full bg-secondary text-white py-3 rounded-xl font-medium hover:bg-secondary-dark disabled:opacity-50 transition-colors"
        >
          Demo Login (Admin)
        </button>
      </div>

      <p className="text-center text-muted mt-6">
        Don&apos;t have an account?{" "}
        <Link href="/register" className="text-primary hover:text-primary-dark font-medium">
          Register
        </Link>
      </p>

      <div className="mt-4 p-4 bg-slate-50 rounded-xl">
        <p className="text-sm text-muted font-medium mb-2">Demo Credentials:</p>
        <p className="text-sm text-dark">Admin: admin@nestfinder.com / admin123</p>
        <p className="text-sm text-dark">User: user@nestfinder.com / user123</p>
      </div>
    </div>
  );
}
