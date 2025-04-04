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
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-accent-foreground p-10 rounded-lg text-white flex flex-col items-center min-w-[500px] animate-in slide-in-from-top-20 duration-700">
        <h1 className="text-xl font-bold">Welcome back!</h1>
        <h1 className="text-sm text-gray-400 pt-1.5 pb-4">
          We're so excited to see you again!
        </h1>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col w-full"
          autoComplete="on"
        >
          {error && (
            <div className="bg-red-500/10 border border-red-500 text-red-500 text-xs p-2 rounded-lg  transition-all">
              {error}
            </div>
          )}
          <InputForm
            label="EMAIL"
            type="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
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
              setFormData({ ...formData, password: e.target.value })
            }
            error={error}
            isRequired={true}
            disabled={loading}
          />

          <a className="text-xs text-indigo-500 mt-1 font-semibold cursor-not-allowed">
            Forgot your password?
          </a>

          <SubmitBtnForm text="Log in" loading={loading} />

          <h1 className="text-xs text-gray-400 pt-4">
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
