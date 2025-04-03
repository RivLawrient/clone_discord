"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import InputForm from "../_components/inputForm";
import SubmitBtnForm from "../_components/submitBtnForm";

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setError("");
    setLoading(true);
    await fetch("http://127.0.0.1:8000/api/login", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
      credentials: "include",
    }).then(async (res) => {
      if (res.ok) {
        router.push("/");
      } else if (res.status === 400) {
        setError("Email or password is incorrect");
        setLoading(false);
      } else if (res.status === 401) {
        setError("Unauthorized");
        setLoading(false);
      }
    });
  };

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
          />

          <a href="" className="text-xs text-blue-500 mt-1 font-semibold">
            Forgot your password?
          </a>

          <SubmitBtnForm text="Log in" loading={loading} />

          <h1 className="text-xs text-gray-400 pt-4">
            Don't have an account?{" "}
            <a href="/register" className="text-blue-500 hover:underline">
              Register
            </a>
          </h1>
        </form>
      </div>
    </div>
  );
}
