import { generateWordList } from "@/lib/ai";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { topic, count } = await req.json();

    if (!topic || !count) {
      return NextResponse.json(
        { error: "主题和数量是必需的" },
        { status: 400 },
      );
    }

    const result = await generateWordList(String(topic), Number(count));
    return NextResponse.json(result);
  } catch (error) {
    console.error("Dictionary generation error:", error);
    const message =
      error instanceof Error ? error.message : "生成词库失败";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
