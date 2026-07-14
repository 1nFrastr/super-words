"use client";

import { Word } from "@/types/word";
import { useState } from "react";

interface WordListProps {
  words: Word[];
  currentIndex: number;
  onWordClick?: (index: number) => void;
}

export default function WordList({ words, currentIndex, onWordClick }: WordListProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* 浮层开关：不占用主内容布局 */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed left-4 top-36 z-40 flex items-center gap-2 rounded-lg border border-blue-500/30 bg-[#0a0a0a]/90 px-3 py-2 text-sm text-blue-300 shadow-lg shadow-blue-500/10 backdrop-blur-sm transition hover:bg-blue-500/20 sm:top-44 ${
          isOpen ? "pointer-events-none opacity-0" : "opacity-100"
        }`}
        title="打开词库列表"
      >
        <span className="h-1.5 w-1.5 rounded-full bg-blue-400" />
        词库 {currentIndex + 1}/{words.length}
      </button>

      {/* 遮罩：点击关闭，主区域保持居中 */}
      <div
        className={`fixed inset-0 z-40 bg-black/40 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={() => setIsOpen(false)}
        aria-hidden={!isOpen}
      />

      {/* 浮层侧栏：覆盖在主内容之上，不推动布局 */}
      <aside
        className={`fixed left-0 top-0 z-50 flex h-full w-80 flex-col border-r border-blue-500/20 bg-[#0a0a0a]/95 shadow-[4px_0_24px_rgba(59,130,246,0.12)] backdrop-blur-sm transition-transform duration-300 ease-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-blue-500/20 p-4">
          <h3 className="text-lg font-medium text-blue-400">词库列表</h3>
          <button
            onClick={() => setIsOpen(false)}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-blue-500/30 bg-blue-500/20 text-blue-300 transition-colors hover:bg-blue-500/30 hover:text-blue-200"
            title="关闭词库列表"
          >
            ←
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          <div className="space-y-1">
            {words.map((word, index) => (
              <div
                key={`${word.english}-${index}`}
                className={`flex cursor-pointer items-center justify-between rounded-lg px-2 py-1.5 text-sm transition-colors ${
                  index === currentIndex
                    ? "border border-blue-500/40 bg-blue-500/20 text-blue-200"
                    : index < currentIndex
                      ? "border border-transparent text-gray-500 hover:bg-blue-500/5"
                      : "border border-transparent text-gray-400 hover:bg-blue-500/10 hover:text-blue-300"
                }`}
                onClick={() => {
                  onWordClick?.(index);
                  setIsOpen(false);
                }}
              >
                <div className="flex items-center space-x-2 overflow-hidden">
                  <span className="flex-shrink-0 text-xs text-gray-500">
                    {(index + 1).toString().padStart(2, "0")}
                  </span>
                  <span className="truncate font-medium">{word.english}</span>
                  <span className="flex-shrink-0 text-gray-600">-</span>
                  <span className="truncate text-gray-400">{word.chinese}</span>
                </div>
                <div className="ml-2 flex flex-shrink-0 items-center">
                  {index < currentIndex && (
                    <span className="text-xs text-blue-400/70">✓</span>
                  )}
                  {index === currentIndex && (
                    <span className="text-xs text-blue-400">●</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t border-blue-500/20 p-4 text-xs text-gray-500">
          <div className="flex justify-between">
            <span>总计: {words.length}</span>
            <span>已完成: {currentIndex}</span>
          </div>
          <div className="mt-2">
            <div className="h-1 w-full rounded-full bg-blue-500/20">
              <div
                className="h-1 rounded-full bg-blue-400 transition-all duration-300"
                style={{
                  width: `${words.length > 0 ? (currentIndex / words.length) * 100 : 0}%`,
                }}
              />
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
