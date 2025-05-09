import { ReactNode } from "react";

export default function Layout(props: { children: ReactNode }) {
  return <div className="bg-neutral-900">{props.children}</div>;
}
