"use client";
import { useEffect } from "react";
import SubmitBtnForm from "../_components/submitBtnForm";
import InputForm from "../_components/inputForm";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import userRegister from "./userRegister";

export default function RegisterPage() {
  const { formData, setFormData, error, loading, setLoading, handleSubmit } =
    userRegister();

  useEffect(() => {
    setLoading(false);
  }, []);
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-accent-foreground p-10 rounded-lg text-white flex flex-col items-center max-w-[500px] animate-in slide-in-from-top-20 duration-700">
        <h1 className="text-xl font-bold pb-4">Create an account</h1>

        <form onSubmit={handleSubmit} className="flex flex-col w-full">
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
            label="DISPLAY NAME"
            type="text"
            value={formData.display_name}
            onChange={(e) =>
              setFormData({ ...formData, display_name: e.target.value })
            }
            error={error}
            disabled={loading}
          />
          <InputForm
            label="USERNAME"
            type="text"
            value={formData.username}
            onChange={(e) =>
              setFormData({ ...formData, username: e.target.value })
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

          <div className="flex flex-col pt-4 w-full">
            <label className="text-xs text-gray-400 font-semibold after:content-['*'] after:text-red-500 after:ml-1">
              DATE OF BIRTH
            </label>
            <div className="flex gap-2 w-full mt-2 justify-stretch">
              <Select
                onValueChange={(value) => {
                  setFormData({
                    ...formData,
                    date_of_birth: {
                      ...formData.date_of_birth,
                      month: parseInt(value),
                    },
                  });
                }}
              >
                <SelectTrigger className="border-gray-800 text-base flex-1">
                  <SelectValue placeholder="Month" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Month</SelectLabel>
                    <SelectItem value="01">Januari</SelectItem>
                    <SelectItem value="02">Februari</SelectItem>
                    <SelectItem value="03">Maret</SelectItem>
                    <SelectItem value="04">April</SelectItem>
                    <SelectItem value="05">Mei</SelectItem>
                    <SelectItem value="06">Juni</SelectItem>
                    <SelectItem value="07">Juli</SelectItem>
                    <SelectItem value="08">Agustus</SelectItem>
                    <SelectItem value="09">September</SelectItem>
                    <SelectItem value="10">Oktober</SelectItem>
                    <SelectItem value="11">November</SelectItem>
                    <SelectItem value="12">Desember</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>

              <Select
                onValueChange={(value) => {
                  setFormData({
                    ...formData,
                    date_of_birth: {
                      ...formData.date_of_birth,
                      day: parseInt(value),
                    },
                  });
                }}
              >
                <SelectTrigger className="border-gray-800 text-base flex-1">
                  <SelectValue placeholder="Day" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel defaultValue="01">Day</SelectLabel>
                    {Array.from({ length: 31 }, (_, i) => {
                      const day = (i + 1).toString().padStart(2, "0");
                      return (
                        <SelectItem key={day} value={day}>
                          {i + 1}
                        </SelectItem>
                      );
                    })}
                  </SelectGroup>
                </SelectContent>
              </Select>

              <Select
                onValueChange={(value) => {
                  setFormData({
                    ...formData,
                    date_of_birth: {
                      ...formData.date_of_birth,
                      year: parseInt(value),
                    },
                  });
                }}
              >
                <SelectTrigger className="border-gray-800 text-base flex-1">
                  <SelectValue placeholder="Year" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel defaultValue="2025">Year</SelectLabel>
                    {Array.from({ length: 100 }, (_, i) => {
                      const year = (new Date().getFullYear() - i).toString();
                      return (
                        <SelectItem key={year} value={year}>
                          {year}
                        </SelectItem>
                      );
                    })}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex items-center gap-2 mt-4">
            <Checkbox className="border-gray-800 size-5" />
            <Label className="text-[10px] text-gray-400 font-semibold flex-wrap">
              (Optional) It’s okay to send me emails with Discord updates, tips,
              and special offers. You can opt out at any time.
            </Label>
          </div>
          <SubmitBtnForm text="Register" loading={loading} />
          <h1 className="text-xs text-gray-400 font-semib old mt-2">
            By signing up, you agree to our{" "}
            <a href="/terms" className="text-blue-500 hover:underline">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="/privacy" className="text-blue-500 hover:underline">
              Privacy Policy
            </a>
          </h1>
          <a
            href="/login"
            className="text-xs text-blue-500 mt-4 hover:underline"
          >
            Already have an account?
          </a>
        </form>
      </div>
    </div>
  );
}
