"use client";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function BackButton({ ...props }: React.ComponentProps<"svg">) {
  const router = useRouter();
  return <ArrowLeft {...props} onClick={() => router.back()} />;
}
