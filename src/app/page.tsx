"use client";

import BrandTitle from "@/components/BrandTitle";
import DictionarySelector from "@/components/DictionarySelector";
import { savePlaySession } from "@/lib/session";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <main className="flex min-h-screen flex-col items-center px-4 py-16 sm:py-24">
      <div className="w-full max-w-3xl">
        <BrandTitle className="mb-8" />
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
