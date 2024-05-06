import Header from "@/components/Header";
import Navbar from "@/components/Navbar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Climb Tracker",
  description:
    "Track your climbing progress and find new gyms where you can reach new heights and conquer your climbing goals",
};

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <main className="h-[85dvh] bg-slate-600">{children}</main>
      <Navbar />
    </>
  );
}
