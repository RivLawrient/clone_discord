export default function page() {
  return (
    <div className="fixed grid h-screen w-screen grid-rows-[auto_1fr] bg-red-400">
      <div className="h-[36px] text-center">HEADER</div>
      <div className="grid min-h-0 grid-cols-[auto_auto_1fr]">
        <div className="mih-h-0 grid min-h-0 grid-rows-[auto_1fr] bg-red-400 pr-2">
          <div className="size-12 rounded-full bg-green-500" />
          <div className="overflow-y-scroll">
            {Array.from({ length: 51 }).map((_, i) => (
              <div key={i} className="size-12 rounded-full bg-red-500" />
            ))}
          </div>
        </div>
        <div className="w-24 rounded-tl-lg bg-green-400">list channel</div>
        <div className="bg-foreground min-w-0 text-white">
          <p className="text-wrap break-words">
            asdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasddsdfsdfsdfsdfsdfsdfsdfsdfsfsfsfsfsfsfsdfsdfsfsfsfsfsfsfsdfsdfsfsfsfsfsfsfsdfsdfsfsfsfsfsfsfsdfsdfsfsfsfsfsfsfsdfsdfsfsfsfsfsfsfsdfsdfsfsfsfsfsfsfsdfsdfsfsfsfsfsfsfsdfsdfsfsfsfsfsfsfsdfsdfsfsfsfsfsfsfsdfsdf
          </p>
        </div>
      </div>
    </div>
  );
}
