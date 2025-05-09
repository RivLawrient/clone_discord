import { cn } from "@/lib/utils";

interface Props {
  label: string;
  type: string;
  error: string;
  isRequired: boolean;
  disabled: boolean;
}

export default function inputForm(props: Props) {
  return (
    <div className="flex flex-col gap-2 pt-4">
      <label
        className={cn(
          "text-xs font-semibold text-gray-400",
          props.isRequired &&
            "after:ml-1 after:text-red-500 after:content-['*']",
        )}
      >
        {props.label}
      </label>
      <input
        id={props.label}
        name={props.label}
        type={props.type}
        maxLength={100}
        disabled={props.disabled}
        className={cn(
          "rounded-lg border border-gray-800 bg-transparent p-2 transition-all focus:border-blue-500 focus:outline-none",
          props.error && "border-red-500",
        )}
      />
    </div>
  );
}
