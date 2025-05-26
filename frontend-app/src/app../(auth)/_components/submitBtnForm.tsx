import { Loader2 } from "lucide-react";

export default function SubmitBtnForm(props: {
  text: string;
  loading: boolean;
}) {
  return (
    <button
      type="submit"
      disabled={props.loading}
      className="mt-4 flex cursor-pointer items-center justify-center gap-2 rounded-lg bg-indigo-500 py-3 text-sm text-white transition-all hover:bg-indigo-600"
    >
      {props.loading ? (
        <Loader2 size={20} className="animate-spin" />
      ) : (
        props.text
      )}
    </button>
  );
}
