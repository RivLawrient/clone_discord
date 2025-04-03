import { cn } from "@/lib/utils";

interface InputFormProps {
  label: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error: string;
  isRequired?: boolean;
  disabled?: boolean;
}

export default function inputForm({
  label,
  type,
  value,
  onChange,
  error,
  isRequired = false,
  disabled = false,
}: InputFormProps) {
  return (
    <div className="flex flex-col gap-2 pt-4">
      <label
        className={cn(
          "text-xs text-gray-400 font-semibold",
          isRequired && "after:content-['*'] after:text-red-500 after:ml-1"
        )}
      >
        {label}
      </label>
      <input
        type={type}
        maxLength={100}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={cn(
          "bg-transparent border border-gray-800 rounded-lg p-2 focus:border-blue-500 focus:outline-none transition-all",
          error && "border-red-500"
        )}
      />
    </div>
  );
}
