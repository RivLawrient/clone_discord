interface submitBtnFormProps {
  text: string;
}

export default function submitBtnForm({ text }: submitBtnFormProps) {
  return (
    <button
      type="submit"
      className="bg-blue-500 text-white text-sm rounded-lg py-3 mt-4 cursor-pointer hover:bg-blue-600 transition-all"
    >
      {text}
    </button>
  );
}
