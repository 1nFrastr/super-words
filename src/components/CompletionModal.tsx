interface CompletionModalProps {
  onRestart: () => void;
  onBackToHome: () => void;
}

export default function CompletionModal({ onRestart, onBackToHome }: CompletionModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="rounded-lg border border-blue-500/30 bg-[#111] p-8 shadow-xl shadow-blue-500/10">
        <h2 className="mb-4 text-2xl font-medium text-blue-400">恭喜完成!</h2>
        <p className="mb-6 text-gray-400">你已完成所有单词的学习。要再来一遍吗？</p>
        <div className="flex justify-end space-x-4">
          <button
            onClick={onBackToHome}
            className="rounded-lg border border-blue-500/20 bg-blue-500/10 px-4 py-2 text-blue-300 transition hover:bg-blue-500/20"
          >
            回到主页
          </button>
          <button
            onClick={onRestart}
            className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 px-4 py-2 text-white transition hover:from-blue-600 hover:to-blue-700"
          >
            <span>再来一遍</span>
            <span className="text-lg">🔀</span>
          </button>
        </div>
      </div>
    </div>
  );
}
