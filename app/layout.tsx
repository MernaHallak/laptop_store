import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Responsive Marketplace Homepage",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
// يعني {children} = “الصفحة الحالية اللي عم تزورها”.

