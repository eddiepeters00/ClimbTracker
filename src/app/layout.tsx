import type { Metadata } from "next";
import { Poppins } from "next/font/google";

import "./globals.css";
import AuthProvider from "./context/AuthProvider";

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Climb Tracker",
  description:
    "Track your climbing progress and find new gyms where you can reach new heights and conquer your climbing goals",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className="h-svh" lang="en">
      <body className={`${poppins.className} relative flex flex-col min-h-dvh`}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
