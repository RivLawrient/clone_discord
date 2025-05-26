import Header from "../_components/header";
import InnerSideBar from "../_components/innerSideBar";
import SideBar from "../_components/sideBar";

export default function Layout(props: { children: React.ReactNode }) {
  return (
    <div className="bg-foreground fixed grid h-screen w-screen grid-rows-[auto_1fr] text-white">
      <Header />
      <div className="grid min-h-0 grid-cols-[auto_auto_1fr]">
        <SideBar />
        <InnerSideBar />
        {props.children}
      </div>
    </div>
  );
}
