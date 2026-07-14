"use client";

import { clearPlaySession } from "@/lib/session";
import Link from "next/link";

export default function BrandTitle() {
  return (
    <Link
      href="/"
      onClick={() => clearPlaySession()}
      className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-center text-4xl font-bold text-transparent transition hover:opacity-90"
      aria-label="AI超级单词表"
    >
      AI超级单词表
    </Link>
  );
}
