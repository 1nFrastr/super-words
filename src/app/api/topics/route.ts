import { generateSuggestedTopics } from "@/lib/ai";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const topics = await generateSuggestedTopics();
    return NextResponse.json({ topics });
  } catch (error) {
    console.error("Topics generation error:", error);
    return NextResponse.json(
      { error: "生成推荐场景失败" },
      { status: 500 },
    );
  }
}
