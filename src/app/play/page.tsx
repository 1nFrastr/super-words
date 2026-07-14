"use client";

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
    <main>
      {session.topic && (
        <div className="pointer-events-none fixed left-1/2 top-4 z-30 -translate-x-1/2 rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-1 text-xs text-blue-300/80">
          {session.topic}
        </div>
      )}
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
