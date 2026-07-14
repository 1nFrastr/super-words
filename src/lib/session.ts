import type { Word } from "@/types/word";

export const PLAY_SESSION_KEY = "super-words:play";

export type PlaySession = {
  words: Word[];
  source: "local" | "custom";
  topic?: string;
};

export function savePlaySession(session: PlaySession): void {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(PLAY_SESSION_KEY, JSON.stringify(session));
}

export function loadPlaySession(): PlaySession | null {
  if (typeof window === "undefined") return null;

  try {
    const raw = sessionStorage.getItem(PLAY_SESSION_KEY);
    if (!raw) return null;

    const parsed = JSON.parse(raw) as PlaySession;
    if (!Array.isArray(parsed.words) || parsed.words.length === 0) {
      return null;
    }

    return parsed;
  } catch {
    return null;
  }
}

export function clearPlaySession(): void {
  if (typeof window === "undefined") return;
  sessionStorage.removeItem(PLAY_SESSION_KEY);
}
