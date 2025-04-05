import { useRouter } from "next/navigation";
import { useState } from "react";

export default function useLogin() {
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
    })
      .then(async (res) => {
        const data = await res.json();
        if (res.ok) {
          router.push("/");
        } else if (res.status === 400) {
          setError("Email or Password is incorrect");
          setLoading(false);
        } else if (res.status === 401) {
          setError(data.errors.message);
          setLoading(false);
        }
      })
      .catch(() => {
        setError("Something went wrong");
        setLoading(false);
      });
  };

  return {
    formData,
    setFormData,
    error,
    loading,
    setLoading,
    handleSubmit,
  };
}
