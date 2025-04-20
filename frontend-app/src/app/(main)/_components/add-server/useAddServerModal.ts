import { useServer } from "@/context/serverContext";
import { useRef, useState } from "react";
import { addServerModalProps } from "./addServerModal";

export default function useAddServerModal(props: addServerModalProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [formData, setFormData] = useState(() => new FormData());
  const [loading, setLoading] = useState(false);
  const { servers, setServers } = useServer();
  const inputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState({
    picture: "",
    name: "",
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const newFormData = new FormData();
      for (let [key, value] of formData.entries()) {
        newFormData.append(key, value);
      }
      newFormData.set("picture", file);
      setFormData(newFormData);

      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFormData = new FormData();
    for (let [key, value] of formData.entries()) {
      newFormData.append(key, value);
    }
    newFormData.set("name", e.target.value);
    setFormData(newFormData);
  };

  const createHandle = async () => {
    if (!formData.get("name")) {
      return;
    }
    setLoading(true);
    try {
      setError({
        picture: "",
        name: "",
      });
      const res = await fetch(`${process.env.HOST_API_PUBLIC}/api/server/new`, {
        method: "POST",
        body: formData,
        credentials: "include",
      });
      if (res.ok) {
        const data = await res.json();
        setServers([...servers, data.data]);
        setLoading(false);
        props.onClose();
      } else {
        const data = await res.json();
        setError({
          ...error,
          ...(data.errors.picture && { picture: data.errors.picture[0] }),
          ...(data.errors.name && { name: data.errors.name[0] }),
        });
        setLoading(false);
      }
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  return {
    inputRef,
    formData,
    handleFileChange,
    previewUrl,
    handleNameChange,
    error,
    createHandle,
    loading,
  };
}
