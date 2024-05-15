import type { Metadata } from "next";
import { Poppins } from "next/font/google";

import "./globals.css";
import AuthProvider from "./context/AuthProvider";
import QueryProvider from "./context/QueryProvider";

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
    <html className="h-full" lang="en">
      <body
        className={`${poppins.className} relative flex flex-col h-full max-w-[1000px] mx-auto`}
      >
        <QueryProvider>
          <AuthProvider>{children}</AuthProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
