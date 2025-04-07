import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export interface FormRegister {
  email: string;
  display_name: string;
  username: string;
  password: string;
  date_of_birth: {
    month: string;
    day: string;
    year: string;
  };
}

export default function userRegister() {
  const [error, setError] = useState({
    email: "",
    display_name: "",
    username: "",
    password: "",
    date_of_birth: "",
    server: "",
  });
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const handleSubmit = async (data: FormRegister) => {
    setError({
      email: "",
      display_name: "",
      username: "",
      password: "",
      date_of_birth: "",
      server: "",
    });
    setLoading(true);
    await fetch(`${process.env.HOST_API_PUBLIC}/api/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        display_name: data.display_name,
        email: data.email,
        username: data.username,
        password: data.password,
        date_of_birth: `${data.date_of_birth.year}-${data.date_of_birth.month}-${data.date_of_birth.day}`,
      }),
      credentials: "include",
    })
      .then(async (res) => {
        const data = await res.json();
        if (res.status == 400) {
          setError((prevError) => ({
            ...prevError,
            ...(data.errors.email && { email: data.errors.email[0] }),
            ...(data.errors.display_name && {
              display_name: data.errors.display_name[0],
            }),
            ...(data.errors.username && { username: data.errors.username[0] }),
            ...(data.errors.password && { password: data.errors.password[0] }),
            ...(data.errors.date_of_birth && {
              date_of_birth: data.errors.date_of_birth[0],
            }),
          }));
        } else {
          router.refresh();
        }
        setLoading(false);
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
