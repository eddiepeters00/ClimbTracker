import Header from "@/components/Header";
import Navbar from "@/components/Navbar";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <main className="flex-grow min-w-max min-h-full">{children}</main>
      <Navbar />
    </>
  );
}
