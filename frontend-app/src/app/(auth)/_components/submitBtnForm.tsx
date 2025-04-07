import { Loader2 } from "lucide-react";

interface submitBtnFormProps {
  text: string;
  loading: boolean;
}

export default function submitBtnForm({ text, loading }: submitBtnFormProps) {
  return (
    <button
      type="submit"
      disabled={loading}
      className="mt-4 flex cursor-pointer items-center justify-center gap-2 rounded-lg bg-indigo-500 py-3 text-sm text-white transition-all hover:bg-indigo-600"
    >
      {loading ? <Loader2 className="animate-spin" /> : text}
    </button>
  );
}
