import { cn } from "@/lib/utils";

interface InputFormProps {
  label: string;
  type: string;
  error: string;
  isRequired?: boolean;
  disabled?: boolean;
}

export default function inputForm({
  label,
  type,
  error,
  isRequired = false,
  disabled = false,
}: InputFormProps) {
  return (
    <div className="flex flex-col gap-2 pt-4">
      <label
        className={cn(
          "text-xs font-semibold text-gray-400",
          isRequired && "after:ml-1 after:text-red-500 after:content-['*']",
        )}
      >
        {label}
      </label>
      <input
        id={label}
        name={label}
        type={type}
        maxLength={100}
        disabled={disabled}
        className={cn(
          "rounded-lg border border-gray-800 bg-transparent p-2 transition-all focus:border-blue-500 focus:outline-none",
          error && "border-red-500",
        )}
      />
    </div>
  );
}
