import type { GenerateWordListResponse } from "@/lib/ai";

export type { GenerateWordListResponse };

export async function generateWordList(
  topic: string,
  count: number,
): Promise<GenerateWordListResponse> {
  const response = await fetch("/api/dictionary", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ topic, count }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "生成词库失败");
  }

  return data as GenerateWordListResponse;
}

export async function generateSuggestedTopics(): Promise<string[]> {
  const response = await fetch("/api/topics");
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "生成推荐场景失败");
  }

  return (data.topics as string[]) ?? [];
}
