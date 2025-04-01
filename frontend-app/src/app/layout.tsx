import type { Metadata } from "next";
import "./globals.css";
import DisableRightClick from "@/components/DisableRightClick";

export const metadata: Metadata = {
  title: "Clone Discord",
  description: "Welcome to Clone Discord",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <DisableRightClick />
        {children}
      </body>
    </html>
  );
}
