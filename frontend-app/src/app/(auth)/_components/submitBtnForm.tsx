import { Loader, Loader2 } from "lucide-react";

interface submitBtnFormProps {
  text: string;
  loading: boolean;
}

export default function submitBtnForm({ text, loading }: submitBtnFormProps) {
  return (
    <button
      type="submit"
      disabled={loading}
      className="bg-indigo-500 text-white text-sm flex items-center justify-center gap-2 rounded-lg py-3 mt-4 cursor-pointer hover:bg-indigo-600 transition-all"
    >
      {loading ? <Loader2 className="animate-spin" /> : text}
    </button>
  );
}
