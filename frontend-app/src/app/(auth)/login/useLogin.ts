import { useRouter } from "next/navigation";
import { useState } from "react";

export interface FormLogin {
  email: string;
  password: string;
}

export default function useLogin() {
  const [error, setError] = useState({
    email: "",
    password: "",
    server: "",
  });
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const handleSubmit = async (data: FormLogin) => {
    setError({
      email: "",
      password: "",
      server: "",
    });
    setLoading(true);
    
    await fetch(`${process.env.HOST_API_PUBLIC}/api/login`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: data.email,
        password: data.password,
      }),
      credentials: "include",
    })
      .then(async (res) => {
        const data = await res.json();
        if (res.ok) {
          router.push("/");
        } else if (res.status === 400) {
          setError((prevError) => ({
            ...prevError,
            ...(data.errors.email && { email: data.errors.email[0] }),
            ...(data.errors.password && { password: data.errors.password[0] }),
          }));
          setLoading(false);
        } else if (res.status === 401) {
          setError((prevError) => ({
            ...prevError,
            ...(data.errors.message && { server: data.errors.message }),
          }));
          setLoading(false);
        }
      })
      .catch(() => {
        setError({
          ...error,
          server: "Server Error",
        });
        setLoading(false);
      });
  };

  return {
    error,
    loading,
    setLoading,
    handleSubmit,
  };
}
