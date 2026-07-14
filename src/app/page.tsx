"use client";

import DictionarySelector from "@/components/DictionarySelector";
import { savePlaySession } from "@/lib/session";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <main className="flex min-h-screen flex-col items-center px-4 py-16 sm:py-24">
      <div className="w-full max-w-3xl">
        <h1 className="mb-8 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-center text-4xl font-bold text-transparent">
          AI超级单词表
        </h1>
        <DictionarySelector
          onSelect={(words, meta) => {
            savePlaySession({
              words,
              source: meta.source,
              topic: meta.topic,
            });
            router.push("/play");
          }}
        />
      </div>
    </main>
  );
}
