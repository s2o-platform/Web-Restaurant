import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "Restaurant HQ",
  description: "Restaurant management dashboard for staff operations.",
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
