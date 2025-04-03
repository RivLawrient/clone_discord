import { useRouter } from "next/navigation";
import { useState } from "react";

export default function userRegister() {
  const [formData, setFormData] = useState({
    email: "",
    display_name: "",
    username: "",
    password: "",
    date_of_birth: {
      month: 0,
      day: 0,
      year: 0,
    },
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setError("");
    if (
      formData.date_of_birth.month === 0 ||
      formData.date_of_birth.day === 0 ||
      formData.date_of_birth.year === 0
    ) {
      setError("Date of birth is required");
    } else {
      setLoading(true);
      await fetch("http://127.0.0.1:8000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          display_name: formData.display_name,
          username: formData.username,
          email: formData.email,
          password: formData.password,
          date_of_birth: `${formData.date_of_birth.year}-${formData.date_of_birth.month}-${formData.date_of_birth.day}`,
        }),
        credentials: "include",
      }).then(async (res) => {
        const data = await res.json();
        if (res.ok) {
          router.push("/");
        } else if (res.status === 400) {
          if (data.errors.email) {
            setError(data.errors.email);
            setLoading(false);
            return;
          } else if (data.errors.display_name) {
            setError(data.errors.display_name[0]);
            setLoading(false);
            return;
          } else if (data.errors.username) {
            setError(data.errors.username[0]);
            setLoading(false);
          } else if (data.errors.password) {
            setError(data.errors.password[0]);
            setLoading(false);
            return;
          } else if (data.errors.date_of_birth) {
            setError(data.errors.date_of_birth[0]);
            setLoading(false);
            return;
          }
        } else {
          setError("Something went wrong");
          setLoading(false);
        }
      });
    }
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
