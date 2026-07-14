"use client";

import BrandTitle from "@/components/BrandTitle";
import Game from "@/components/Game";
import {
  clearPlaySession,
  loadPlaySession,
  savePlaySession,
  type PlaySession,
} from "@/lib/session";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function PlayPage() {
  const router = useRouter();
  const [session, setSession] = useState<PlaySession | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const loaded = loadPlaySession();
    if (!loaded) {
      router.replace("/");
      return;
    }
    setSession(loaded);
    setReady(true);
  }, [router]);

  const handleExit = () => {
    clearPlaySession();
    router.push("/");
  };

  if (!ready || !session) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <p className="text-sm text-gray-500">加载练习中...</p>
      </main>
    );
  }

  return (
    <main className="relative min-h-screen">
      <div className="pointer-events-none fixed inset-x-0 top-6 z-30 flex flex-col items-center px-4">
        <div className="pointer-events-auto">
          <BrandTitle href="/" onClick={clearPlaySession} as="div" />
        </div>
        {session.topic && (
          <p className="mt-2 text-center text-sm text-gray-500">
            主题：{session.topic}
          </p>
        )}
      </div>
      <Game
        words={session.words}
        onExit={handleExit}
        onWordsChange={(words) => {
          const next = { ...session, words };
          savePlaySession(next);
          setSession(next);
        }}
      />
    </main>
  );
}
