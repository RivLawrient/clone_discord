"use client";

import { useEffect } from "react";
import InputForm from "../_components/inputForm";
import SubmitBtnForm from "../_components/submitBtnForm";
import useLogin from "./useLogin";

export default function LoginPage() {
  const { formData, setFormData, error, loading, setLoading, handleSubmit } =
    useLogin();

  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="bg-accent-foreground animate-in slide-in-from-top-20 flex min-w-[500px] flex-col items-center rounded-lg p-10 text-white duration-700">
        <h1 className="text-xl font-bold">Welcome back!</h1>
        <h1 className="pt-1.5 pb-4 text-sm text-gray-400">
          We're so excited to see you again!
        </h1>

        <form
          onSubmit={handleSubmit}
          className="flex w-full flex-col"
          autoComplete="on"
        >
          {error && (
            <div className="rounded-lg border border-red-500 bg-red-500/10 p-2 text-xs text-red-500 transition-all">
              {error}
            </div>
          )}
          <InputForm
            label="EMAIL"
            type="email"
            value={formData.email}
            onChange={(e) =>
              setTimeout(() => {
                setFormData({ ...formData, email: e.target.value });
              }, 1000)
            }
            error={error}
            isRequired={true}
            disabled={loading}
          />
          <InputForm
            label="PASSWORD"
            type="password"
            value={formData.password}
            onChange={(e) =>
              setTimeout(() => {
                setFormData({ ...formData, password: e.target.value });
              }, 1000)
            }
            error={error}
            isRequired={true}
            disabled={loading}
          />

          <a className="mt-1 cursor-not-allowed text-xs font-semibold text-indigo-500">
            Forgot your password?
          </a>

          <SubmitBtnForm text="Log in" loading={loading} />

          <h1 className="pt-4 text-xs text-gray-400">
            Don't have an account?{" "}
            <a href="/register" className="text-indigo-500 hover:underline">
              Register
            </a>
          </h1>
        </form>
      </div>
    </div>
  );
}
