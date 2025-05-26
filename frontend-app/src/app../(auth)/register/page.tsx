"use client";
import SubmitBtnForm from "../_components/submitBtnForm";
import userRegister from "./useRegister";
import InputForm from "../_components/inputForm";
import { useEffect } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Page() {
  const { error, loading, setLoading, handleSubmit } = userRegister();

  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="bg-accent-foreground animate-in slide-in-from-top-20 flex max-w-[500px] flex-col items-center rounded-lg p-10 text-white duration-700">
        <h1 className="pb-4 text-xl font-bold">Create an account</h1>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            const form = new FormData(e.target as HTMLFormElement);
            const data = {
              email: form.get("EMAIL") as string,
              display_name: form.get("DISPLAY NAME") as string,
              username: form.get("USERNAME") as string,
              password: form.get("PASSWORD") as string,
              date_of_birth: {
                month: form.get("MONTH") as string,
                day: form.get("DAY") as string,
                year: form.get("YEAR") as string,
              },
            };
            handleSubmit(data);
          }}
          className="flex w-full flex-col"
        >
          {(error.email ||
            error.display_name ||
            error.username ||
            error.password ||
            error.date_of_birth ||
            error.server) && (
            <div className="rounded-lg border border-red-500 bg-red-500/10 p-2 text-xs text-red-500 transition-all">
              {error.email ||
                error.display_name ||
                error.username ||
                error.password ||
                error.date_of_birth ||
                error.server}
            </div>
          )}
          <InputForm
            label="EMAIL"
            type="email"
            error={error.email}
            isRequired={true}
            disabled={loading}
          />

          <InputForm
            label="DISPLAY NAME"
            type="text"
            error={error.display_name}
            isRequired={false}
            disabled={loading}
          />
          <InputForm
            label="USERNAME"
            type="text"
            error={error.username}
            isRequired={true}
            disabled={loading}
          />
          <InputForm
            label="PASSWORD"
            type="password"
            error={error.password}
            isRequired={true}
            disabled={loading}
          />

          <div className="flex w-full flex-col pt-4">
            <label className="text-xs font-semibold text-gray-400 after:ml-1 after:text-red-500 after:content-['*']">
              DATE OF BIRTH
            </label>
            <div className="mt-2 flex w-full justify-stretch gap-2">
              <Select name="MONTH">
                <SelectTrigger
                  className={cn(
                    "flex-1 border-gray-800 text-base",
                    error.date_of_birth && "border-red-500",
                  )}
                >
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

              <Select name="DAY">
                <SelectTrigger
                  className={cn(
                    "flex-1 border-gray-800 text-base",
                    error.date_of_birth && "border-red-500",
                  )}
                >
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

              <Select name="YEAR">
                <SelectTrigger
                  className={cn(
                    "flex-1 border-gray-800 text-base",
                    error.date_of_birth && "border-red-500",
                  )}
                >
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
          <div className="mt-4 flex items-center gap-2">
            <Checkbox className="size-5 border-gray-800" />
            <Label className="flex-wrap text-[10px] font-semibold text-gray-400">
              (Optional) It’s okay to send me emails with Discord updates, tips,
              and special offers. You can opt out at any time.
            </Label>
          </div>
          <SubmitBtnForm text="Register" loading={loading} />
          <h1 className="font-semib old mt-2 text-xs text-gray-400">
            By signing up, you agree to our{" "}
            <a
              href="https://discord.com/terms"
              className="text-indigo-500 hover:underline"
            >
              Terms of Service
            </a>{" "}
            and{" "}
            <a
              href="https://discord.com/privacy"
              className="text-indigo-500 hover:underline"
            >
              Privacy Policy
            </a>
          </h1>
          <a
            href="/login"
            className="mt-4 text-xs text-indigo-500 hover:underline"
          >
            Already have an account?
          </a>
        </form>
      </div>
    </div>
  );
}
