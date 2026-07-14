"use client";

import { useEffect, useState } from "react";

interface GamePauseModalProps {
  onClose: () => void;
}

export default function GamePauseModal({ onClose }: GamePauseModalProps) {
  const [message, setMessage] = useState("");

  useEffect(() => {
    const messages = [
      "别忘了回来继续练习哦，我在等着你呢！",
      "休息一下没关系，但别让我等太久！",
      "快点回来吧，你的英语能力正在蓄势待发！",
    ];
    const randomIndex = Math.floor(Math.random() * messages.length);
    setMessage(messages[randomIndex]);

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="w-full max-w-lg rounded-lg border border-blue-500/30 bg-[#111] p-6 shadow-xl shadow-blue-500/10">
        <h2 className="mb-8 text-2xl font-medium text-blue-400">游戏暂停</h2>
        <p className="mb-8 text-base text-gray-400">{message}</p>
        <div className="flex w-full justify-end">
          <button
            onClick={onClose}
            className="rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-2 text-white transition hover:from-blue-600 hover:to-blue-700"
          >
            继续游戏
          </button>
        </div>
      </div>
    </div>
  );
}
