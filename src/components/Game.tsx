"use client";

import { Word } from "@/types/word";
import { useCallback, useEffect, useState } from "react";
import useSound from "use-sound";

import AnswerTip from "./AnswerTip";
import CompletionModal from "./CompletionModal";
import GamePauseModal from "./GamePauseModal";
import Input from "./Input";
import { mockSpeak } from "./SoundPlayer";
import WordList from "./WordList";

interface GameProps {
  words: Word[];
  onExit: () => void;
  onWordsChange?: (words: Word[]) => void;
}

export default function Game({ words: initialWords, onExit, onWordsChange }: GameProps) {
  const [selectedWords, setSelectedWords] = useState<Word[]>(initialWords);
  const [currentWord, setCurrentWord] = useState<Word | null>(
    initialWords[0] ?? null,
  );
  const [wordIndex, setWordIndex] = useState(0);
  const [isAnswerTipVisible, setIsAnswerTipVisible] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [wrongCount, setWrongCount] = useState(0);
  const [playCorrect] = useSound("/sounds/right.mp3");
  const [playWrong] = useSound("/sounds/error.mp3");

  useEffect(() => {
    setSelectedWords(initialWords);
    setCurrentWord(initialWords[0] ?? null);
    setWordIndex(0);
    setIsAnswerTipVisible(false);
    setIsCompleted(false);
    setWrongCount(0);
  }, [initialWords]);

  useEffect(() => {
    if (currentWord?.english) {
      if (
        wordIndex === 0 ||
        currentWord.english !== selectedWords[wordIndex - 1]?.english
      ) {
        setTimeout(() => {
          mockSpeak(currentWord.english);
        }, 100);
      }
    }
  }, [currentWord?.english, wordIndex, selectedWords]);

  const handleNext = useCallback(() => {
    const nextIndex = wordIndex + 1;
    if (nextIndex >= selectedWords.length) {
      setIsCompleted(true);
    } else {
      setCurrentWord(selectedWords[nextIndex]);
      setWordIndex(nextIndex);
      setIsAnswerTipVisible(false);
      setWrongCount(0);
    }
  }, [wordIndex, selectedWords]);

  const handleWordClick = useCallback(
    (index: number) => {
      if (index >= 0 && index < selectedWords.length) {
        setCurrentWord(selectedWords[index]);
        setWordIndex(index);
        setIsAnswerTipVisible(false);
        setWrongCount(0);
      }
    },
    [selectedWords],
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      if (key === "p" && e.altKey) {
        e.preventDefault();
        setIsPaused((prev) => !prev);
      } else if (key === "k" && e.altKey) {
        e.preventDefault();
        setIsAnswerTipVisible((prev) => !prev);
      } else if (key === "l" && e.altKey) {
        e.preventDefault();
        handleNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleNext]);

  const handleCorrect = () => {
    playCorrect();
    setTimeout(() => {
      const nextIndex = wordIndex + 1;
      if (nextIndex >= selectedWords.length) {
        setIsCompleted(true);
      } else {
        setCurrentWord(selectedWords[nextIndex]);
        setWordIndex(nextIndex);
      }
      setIsAnswerTipVisible(false);
      setWrongCount(0);
    }, 300);
  };

  const shuffleWords = (words: Word[]): Word[] => {
    const shuffled = [...words];
    const lastWord = shuffled[wordIndex];

    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    if (shuffled[0]?.english === lastWord?.english && shuffled.length > 2) {
      const randomPosition =
        Math.floor(Math.random() * (shuffled.length - 2)) + 1;
      [shuffled[0], shuffled[randomPosition]] = [
        shuffled[randomPosition],
        shuffled[0],
      ];
    }

    return shuffled;
  };

  const handleRestart = () => {
    const shuffledWords = shuffleWords(selectedWords);
    setSelectedWords(shuffledWords);
    setCurrentWord(shuffledWords[0]);
    setWordIndex(0);
    setIsAnswerTipVisible(false);
    setIsCompleted(false);
    setWrongCount(0);
    onWordsChange?.(shuffledWords);
  };

  const handleWrong = () => {
    playWrong();
    setWrongCount((prev) => {
      if (prev >= 2) {
        setIsAnswerTipVisible(true);
        return 0;
      }
      return prev + 1;
    });
  };

  const handleShowAnswer = () => {
    setWrongCount(0);
    setIsAnswerTipVisible(true);
  };

  if (!currentWord) {
    return null;
  }

  return (
    <>
      <WordList
        words={selectedWords}
        currentIndex={wordIndex}
        onWordClick={handleWordClick}
      />

      <button
        onClick={onExit}
        className="fixed right-4 top-16 z-30 rounded-lg border border-blue-500/20 bg-blue-500/10 px-4 py-2 text-sm text-blue-300 transition hover:bg-blue-500/20 sm:top-24"
      >
        切换词库
      </button>

      {/* 单词输出区：相对视口水平垂直居中 */}
      <div className="flex min-h-screen w-full items-center justify-center px-4">
        <div className="mx-auto w-full max-w-2xl">
          <div className="mb-2 text-center text-sm text-gray-500">
            进度: {wordIndex + 1} / {selectedWords.length}
          </div>
          <div className="mb-8 text-center text-2xl text-gray-300">
            {currentWord.chinese}
          </div>

          <div className="relative">
            {isAnswerTipVisible && <AnswerTip word={currentWord} />}
            <Input
              word={currentWord}
              onCorrect={handleCorrect}
              onWrong={handleWrong}
            />
          </div>

          <div className="mt-12 flex justify-center space-x-4">
            <button
              onClick={handleShowAnswer}
              className="rounded-lg border border-blue-500/20 bg-blue-500/5 px-4 py-2 text-xs text-gray-400 transition-colors hover:bg-blue-500/10 hover:text-blue-300"
            >
              显示答案 (Alt+K)
            </button>
            <button
              onClick={handleNext}
              className="rounded-lg border border-blue-500/20 bg-blue-500/5 px-4 py-2 text-xs text-gray-400 transition-colors hover:bg-blue-500/10 hover:text-blue-300"
            >
              下一个 (Alt+L)
            </button>
            <button
              onClick={() => setIsPaused(true)}
              className="rounded-lg border border-blue-500/20 bg-blue-500/5 px-4 py-2 text-xs text-gray-400 transition-colors hover:bg-blue-500/10 hover:text-blue-300"
            >
              暂停 (Alt+P)
            </button>
          </div>
        </div>
      </div>

      {isPaused && <GamePauseModal onClose={() => setIsPaused(false)} />}
      {isCompleted && (
        <CompletionModal onRestart={handleRestart} onBackToHome={onExit} />
      )}
    </>
  );
}
